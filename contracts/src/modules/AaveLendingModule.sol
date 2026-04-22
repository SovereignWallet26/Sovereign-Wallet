// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title AaveLendingModule
 * @dev Module for Aave lending/borrowing integration
 * This module can be installed in a SovereignAccount to enable DeFi operations
 */
contract AaveLendingModule {
    using SafeERC20 for IERC20;

    // Aave V3 Pool addresses (Polygon Mumbai testnet)
    address public constant AAVE_POOL = 0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B;
    address public constant AAVE_POOL_ADDRESSES_PROVIDER = 0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6;
    
    // Common tokens (testnet)
    address public constant WETH = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa;
    address public constant DAI = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063;
    address public constant USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant AAVE = 0xD6DF932A45C0f255f85145f286eA0b292B21C90B;

    // Sovereign Account that owns this module
    address public sovereignAccount;

    // Events
    event Deposit(address indexed token, uint256 amount);
    event Withdraw(address indexed token, uint256 amount);
    event Borrow(address indexed token, uint256 amount);
    event Repay(address indexed token, uint256 amount);

    /**
     * @dev Constructor
     * @param _sovereignAccount Address of the SovereignAccount that owns this module
     */
    constructor(address _sovereignAccount) {
        require(_sovereignAccount != address(0), "AaveLendingModule: invalid account");
        sovereignAccount = _sovereignAccount;
    }

    /**
     * @dev Modifier to restrict access to SovereignAccount only
     */
    modifier onlySovereignAccount() {
        require(msg.sender == sovereignAccount, "AaveLendingModule: only SovereignAccount");
        _;
    }

    /**
     * @dev Deposit tokens to Aave
     * @param token Address of token to deposit
     * @param amount Amount to deposit
     */
    function deposit(address token, uint256 amount) external onlySovereignAccount {
        require(token != address(0), "AaveLendingModule: invalid token");
        require(amount > 0, "AaveLendingModule: amount must be > 0");
        
        // In production: call Aave Pool deposit function
        // For now, just emit event
        emit Deposit(token, amount);
        
        // Example Aave interaction (commented for now):
        // IERC20(token).safeTransferFrom(sovereignAccount, address(this), amount);
        // IERC20(token).safeApprove(AAVE_POOL, amount);
        // IPool(AAVE_POOL).deposit(token, amount, sovereignAccount, 0);
    }

    /**
     * @dev Withdraw tokens from Aave
     * @param token Address of token to withdraw
     * @param amount Amount to withdraw
     */
    function withdraw(address token, uint256 amount) external onlySovereignAccount {
        require(token != address(0), "AaveLendingModule: invalid token");
        require(amount > 0, "AaveLendingModule: amount must be > 0");
        
        // In production: call Aave Pool withdraw function
        emit Withdraw(token, amount);
        
        // Example Aave interaction (commented for now):
        // IPool(AAVE_POOL).withdraw(token, amount, sovereignAccount);
    }

    /**
     * @dev Borrow tokens from Aave
     * @param token Address of token to borrow
     * @param amount Amount to borrow
     */
    function borrow(address token, uint256 amount) external onlySovereignAccount {
        require(token != address(0), "AaveLendingModule: invalid token");
        require(amount > 0, "AaveLendingModule: amount must be > 0");
        
        // In production: call Aave Pool borrow function
        emit Borrow(token, amount);
        
        // Example Aave interaction (commented for now):
        // IPool(AAVE_POOL).borrow(token, amount, 2, 0, sovereignAccount);
    }

    /**
     * @dev Repay borrowed tokens to Aave
     * @param token Address of token to repay
     * @param amount Amount to repay
     */
    function repay(address token, uint256 amount) external onlySovereignAccount {
        require(token != address(0), "AaveLendingModule: invalid token");
        require(amount > 0, "AaveLendingModule: amount must be > 0");
        
        // In production: call Aave Pool repay function
        emit Repay(token, amount);
        
        // Example Aave interaction (commented for now):
        // IERC20(token).safeTransferFrom(sovereignAccount, address(this), amount);
        // IERC20(token).safeApprove(AAVE_POOL, amount);
        // IPool(AAVE_POOL).repay(token, amount, 2, sovereignAccount);
    }

    /**
     * @dev Get health factor from Aave (simplified)
     * @return healthFactor Current health factor (scaled by 1e18)
     */
    function getHealthFactor() external view returns (uint256 healthFactor) {
        // In production: call Aave Pool getUserAccountData
        // For now, return a safe value
        return 2 * 1e18; // 2.0 health factor (safe)
    }

    /**
     * @dev Get available borrow balance (simplified)
     * @param token Address of token
     * @return availableBorrow Available amount to borrow
     */
    function getAvailableBorrow(address token) external view returns (uint256 availableBorrow) {
        require(token != address(0), "AaveLendingModule: invalid token");
        
        // In production: calculate based on collateral and LTV
        // For now, return example value
        return 1000 * 1e18; // 1000 tokens available
    }

    /**
     * @dev Emergency function to recover tokens sent by mistake
     * @param token Address of token to recover
     */
    function recoverToken(address token) external onlySovereignAccount {
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "AaveLendingModule: no balance");
        
        IERC20(token).safeTransfer(sovereignAccount, balance);
    }
}

// Interface for Aave Pool (simplified)
interface IPool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
    function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external;
    function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256);
    function getUserAccountData(address user) external view returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    );
}