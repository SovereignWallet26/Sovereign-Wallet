// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title SovereignAccount
 * @dev A 100% decentralized smart contract wallet with ERC-4337 and social recovery
 * Features:
 * - ERC-4337 Account Abstraction
 * - Social recovery via guardians
 * - Module system for extensibility
 * - Gas sponsorship
 */
contract SovereignAccount is BaseAccount {
    using ECDSA for bytes32;

    // EntryPoint contract for ERC-4337
    IEntryPoint private immutable _entryPoint;

    // Owner of the account (initial signer)
    address public owner;

    // Guardians for social recovery (minimum 3/5 for recovery)
    address[] public guardians;
    uint256 public constant MIN_GUARDIANS = 3;
    uint256 public constant MAX_GUARDIANS = 10;

    // Modules registry (Aave, Uniswap, etc.)
    mapping(address => bool) public installedModules;

    // Recovery state
    struct RecoveryRequest {
        address newOwner;
        uint256 timestamp;
        mapping(address => bool) approvals;
        uint256 approvalCount;
        bool executed;
    }
    
    mapping(uint256 => RecoveryRequest) public recoveryRequests;
    uint256 public recoveryRequestCount;

    // Events
    event AccountCreated(address indexed owner, address[] guardians);
    event GuardianAdded(address indexed guardian);
    event GuardianRemoved(address indexed guardian);
    event ModuleInstalled(address indexed module);
    event ModuleUninstalled(address indexed module);
    event RecoveryRequested(uint256 indexed requestId, address indexed newOwner);
    event RecoveryApproved(uint256 indexed requestId, address indexed guardian);
    event RecoveryExecuted(uint256 indexed requestId, address indexed newOwner);
    event TransactionExecuted(address indexed target, uint256 value, bytes data);

    /**
     * @dev Constructor - creates a new Sovereign Account
     * @param _owner Initial owner of the account
     * @param _guardians Initial guardians for social recovery (3-10 addresses)
     * @param anEntryPoint ERC-4337 EntryPoint contract address
     */
    constructor(
        address _owner,
        address[] memory _guardians,
        IEntryPoint anEntryPoint
    ) {
        require(_owner != address(0), "SovereignAccount: owner cannot be zero");
        require(_guardians.length >= 3 && _guardians.length <= 10, "SovereignAccount: invalid guardians count");
        
        owner = _owner;
        _entryPoint = anEntryPoint;
        
        // Add guardians
        for (uint256 i = 0; i < _guardians.length; i++) {
            require(_guardians[i] != address(0), "SovereignAccount: guardian cannot be zero");
            require(_guardians[i] != _owner, "SovereignAccount: guardian cannot be owner");
            
            // Check for duplicates
            for (uint256 j = 0; j < i; j++) {
                require(_guardians[i] != _guardians[j], "SovereignAccount: duplicate guardian");
            }
            
            guardians.push(_guardians[i]);
        }
        
        emit AccountCreated(_owner, _guardians);
    }

    /**
     * @dev Returns the ERC-4337 EntryPoint contract
     */
    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }

    /**
     * @dev Validates a user operation (ERC-4337)
     * @param userOp The user operation
     * @param userOpHash Hash of the user operation
     * @param missingAccountFunds Funds needed to be deposited to the entry point
     */
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external override returns (uint256 validationData) {
        require(msg.sender == address(_entryPoint), "SovereignAccount: caller not entry point");
        
        // Check signature
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address signer = hash.recover(userOp.signature);
        
        require(signer == owner, "SovereignAccount: invalid signature");
        
        // Pay for gas if needed
        if (missingAccountFunds > 0) {
            (bool success, ) = payable(msg.sender).call{value: missingAccountFunds}("");
            (success); // silence unused variable warning
            // ignore failure (its EntryPoint's job to verify, not account's)
        }
        
        return 0;
    }

    /**
     * @dev Execute a transaction from this account
     * @param dest Destination address
     * @param value Ether value to send
     * @param func Function call data
     */
    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        require(msg.sender == address(this) || msg.sender == owner, "SovereignAccount: not authorized");
        
        (bool success, ) = dest.call{value: value}(func);
        require(success, "SovereignAccount: execution failed");
        
        emit TransactionExecuted(dest, value, func);
    }

    /**
     * @dev Execute a batch of transactions
     * @param dests Array of destination addresses
     * @param values Array of ether values
     * @param funcs Array of function call data
     */
    function executeBatch(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata funcs
    ) external {
        require(msg.sender == address(this) || msg.sender == owner, "SovereignAccount: not authorized");
        require(dests.length == values.length && values.length == funcs.length, "SovereignAccount: array length mismatch");
        
        for (uint256 i = 0; i < dests.length; i++) {
            (bool success, ) = dests[i].call{value: values[i]}(funcs[i]);
            require(success, "SovereignAccount: batch execution failed");
            
            emit TransactionExecuted(dests[i], values[i], funcs[i]);
        }
    }

    /**
     * @dev Install a module (Aave, Uniswap, etc.)
     * @param module Address of the module contract
     */
    function installModule(address module) external {
        require(msg.sender == owner, "SovereignAccount: only owner");
        require(module != address(0), "SovereignAccount: module cannot be zero");
        require(!installedModules[module], "SovereignAccount: module already installed");
        
        installedModules[module] = true;
        emit ModuleInstalled(module);
    }

    /**
     * @dev Uninstall a module
     * @param module Address of the module contract
     */
    function uninstallModule(address module) external {
        require(msg.sender == owner, "SovereignAccount: only owner");
        require(installedModules[module], "SovereignAccount: module not installed");
        
        installedModules[module] = false;
        emit ModuleUninstalled(module);
    }

    /**
     * @dev Add a new guardian
     * @param guardian Address of the new guardian
     */
    function addGuardian(address guardian) external {
        require(msg.sender == owner, "SovereignAccount: only owner");
        require(guardian != address(0), "SovereignAccount: guardian cannot be zero");
        require(guardian != owner, "SovereignAccount: guardian cannot be owner");
        require(guardians.length < MAX_GUARDIANS, "SovereignAccount: max guardians reached");
        
        // Check for duplicates
        for (uint256 i = 0; i < guardians.length; i++) {
            require(guardians[i] != guardian, "SovereignAccount: guardian already exists");
        }
        
        guardians.push(guardian);
        emit GuardianAdded(guardian);
    }

    /**
     * @dev Remove a guardian
     * @param guardian Address of the guardian to remove
     */
    function removeGuardian(address guardian) external {
        require(msg.sender == owner, "SovereignAccount: only owner");
        require(guardians.length > MIN_GUARDIANS, "SovereignAccount: min guardians required");
        
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == guardian) {
                guardians[i] = guardians[guardians.length - 1];
                guardians.pop();
                emit GuardianRemoved(guardian);
                return;
            }
        }
        
        revert("SovereignAccount: guardian not found");
    }

    /**
     * @dev Request account recovery (initiated by guardians)
     * @param newOwner Proposed new owner address
     */
    function requestRecovery(address newOwner) external {
        require(isGuardian(msg.sender), "SovereignAccount: only guardians");
        require(newOwner != address(0), "SovereignAccount: new owner cannot be zero");
        require(newOwner != owner, "SovereignAccount: new owner cannot be current owner");
        
        uint256 requestId = recoveryRequestCount++;
        RecoveryRequest storage request = recoveryRequests[requestId];
        request.newOwner = newOwner;
        request.timestamp = block.timestamp;
        
        emit RecoveryRequested(requestId, newOwner);
    }

    /**
     * @dev Approve a recovery request
     * @param requestId ID of the recovery request
     */
    function approveRecovery(uint256 requestId) external {
        require(isGuardian(msg.sender), "SovereignAccount: only guardians");
        
        RecoveryRequest storage request = recoveryRequests[requestId];
        require(request.newOwner != address(0), "SovereignAccount: invalid request");
        require(!request.executed, "SovereignAccount: already executed");
        require(!request.approvals[msg.sender], "SovereignAccount: already approved");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
        emit RecoveryApproved(requestId, msg.sender);
        
        // Execute if enough approvals
        if (request.approvalCount >= MIN_GUARDIANS) {
            _executeRecovery(requestId);
        }
    }

    /**
     * @dev Execute recovery (internal)
     * @param requestId ID of the recovery request
     */
    function _executeRecovery(uint256 requestId) internal {
        RecoveryRequest storage request = recoveryRequests[requestId];
        require(!request.executed, "SovereignAccount: already executed");
        require(request.approvalCount >= MIN_GUARDIANS, "SovereignAccount: insufficient approvals");
        
        address oldOwner = owner;
        owner = request.newOwner;
        request.executed = true;
        
        emit RecoveryExecuted(requestId, request.newOwner);
    }

    /**
     * @dev Check if an address is a guardian
     * @param addr Address to check
     * @return bool True if address is a guardian
     */
    function isGuardian(address addr) public view returns (bool) {
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == addr) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Get all guardians
     * @return Array of guardian addresses
     */
    function getGuardians() external view returns (address[] memory) {
        return guardians;
    }

    /**
     * @dev Get recovery request details
     * @param requestId ID of the recovery request
     * @return newOwner Proposed new owner
     * @return timestamp When request was created
     * @return approvalCount Number of approvals
     * @return executed Whether recovery was executed
     */
    function getRecoveryRequest(uint256 requestId) external view returns (
        address newOwner,
        uint256 timestamp,
        uint256 approvalCount,
        bool executed
    ) {
        RecoveryRequest storage request = recoveryRequests[requestId];
        return (
            request.newOwner,
            request.timestamp,
            request.approvalCount,
            request.executed
        );
    }

    /**
     * @dev Check if a guardian approved a recovery request
     * @param requestId ID of the recovery request
     * @param guardian Address of the guardian
     * @return bool True if guardian approved
     */
    function hasGuardianApproved(uint256 requestId, address guardian) external view returns (bool) {
        return recoveryRequests[requestId].approvals[guardian];
    }

    /**
     * @dev Receive ether
     */
    receive() external payable {}

    /**
     * @dev Withdraw ether from the account
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "SovereignAccount: only owner");
        require(address(this).balance >= amount, "SovereignAccount: insufficient balance");
        
        payable(owner).transfer(amount);
    }
}