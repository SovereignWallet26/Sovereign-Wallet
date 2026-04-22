// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IAaveLendingModule
 * @dev Interface for AaveLendingModule contract
 */
interface IAaveLendingModule {
    // Events
    event Deposit(address indexed token, uint256 amount);
    event Withdraw(address indexed token, uint256 amount);
    event Borrow(address indexed token, uint256 amount);
    event Repay(address indexed token, uint256 amount);

    // View functions
    function sovereignAccount() external view returns (address);
    function getHealthFactor() external view returns (uint256);
    function getAvailableBorrow(address token) external view returns (uint256);

    // Aave operations
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount) external;
    function borrow(address token, uint256 amount) external;
    function repay(address token, uint256 amount) external;

    // Emergency recovery
    function recoverToken(address token) external;
}