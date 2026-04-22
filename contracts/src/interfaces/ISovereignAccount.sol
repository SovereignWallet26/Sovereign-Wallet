// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/interfaces/IAccount.sol";

/**
 * @title ISovereignAccount
 * @dev Interface for SovereignAccount contract
 */
interface ISovereignAccount is IAccount {
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

    // View functions
    function owner() external view returns (address);
    function getGuardians() external view returns (address[] memory);
    function isGuardian(address addr) external view returns (bool);
    function installedModules(address module) external view returns (bool);
    function getRecoveryRequest(uint256 requestId) external view returns (
        address newOwner,
        uint256 timestamp,
        uint256 approvalCount,
        bool executed
    );
    function hasGuardianApproved(uint256 requestId, address guardian) external view returns (bool);

    // Transaction execution
    function execute(address dest, uint256 value, bytes calldata func) external;
    function executeBatch(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata funcs
    ) external;

    // Module management
    function installModule(address module) external;
    function uninstallModule(address module) external;

    // Guardian management
    function addGuardian(address guardian) external;
    function removeGuardian(address guardian) external;

    // Social recovery
    function requestRecovery(address newOwner) external;
    function approveRecovery(uint256 requestId) external;

    // Withdraw
    function withdraw(uint256 amount) external;

    // Receive ether
    receive() external payable;
}