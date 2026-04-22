# Sovereign Wallet - Smart Contracts

Smart contracts for Sovereign Wallet, a 100% decentralized wallet with ERC-4337 and social recovery.

## 📁 Project Structure

```
contracts/
├── src/
│   ├── core/                 # Core contracts
│   │   └── SovereignAccount.sol  # Main account contract
│   ├── modules/              # DeFi modules
│   │   └── AaveLendingModule.sol # Aave integration
│   └── interfaces/           # Contract interfaces
├── test/                     # Tests
├── scripts/                  # Deployment scripts
└── typechain-types/          # Generated TypeScript types
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
cd contracts
npm install
```

### Compile Contracts
```bash
npm run compile
```

### Run Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Deploy to Testnet
```bash
# Set environment variables
cp .env.example .env
# Edit .env with your keys

# Deploy to Goerli
npm run deploy:goerli

# Deploy to Mumbai (Polygon testnet)
npm run deploy:mumbai
```

## 📋 Contracts

### 1. SovereignAccount
The main account contract implementing ERC-4337 Account Abstraction.

**Features:**
- ERC-4337 compliant
- Social recovery via guardians (3/5 multisig)
- Module system for extensibility
- Batch transactions
- Gas sponsorship support

**Constructor Parameters:**
- `owner`: Initial owner address
- `guardians`: Array of guardian addresses (3-10)
- `entryPoint`: ERC-4337 EntryPoint contract address

### 2. AaveLendingModule
Example DeFi module for Aave integration.

**Features:**
- Deposit/withdraw tokens
- Borrow/repay loans
- Health factor monitoring
- Available borrow calculation

## 🔧 Development

### Environment Setup
Create a `.env` file with:
```bash
# RPC URLs
GOERLI_RPC_URL=https://eth-goerli.g.alchemy.com/v2/YOUR_KEY
MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY

# Private Key (with test ETH)
PRIVATE_KEY=your_private_key_here

# API Keys (optional)
ETHERSCAN_API_KEY=your_etherscan_key
POLYGONSCAN_API_KEY=your_polygonscan_key
COINMARKETCAP_API_KEY=your_coinmarketcap_key
```

### Testing
```bash
# Run all tests
npm run test

# Run specific test file
npx hardhat test test/SovereignAccount.test.ts

# Run tests with gas report
npm run gas

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Lint Solidity code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🚢 Deployment

### Local Network
```bash
# Start local Hardhat network
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost
```

### Testnets
```bash
# Goerli (Ethereum testnet)
npm run deploy:goerli

# Mumbai (Polygon testnet)
npm run deploy:mumbai

# Sepolia (Ethereum testnet)
npm run deploy:sepolia
```

### Verification
```bash
# Verify on Etherscan
npx hardhat verify --network goerli <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>

# Or use the script
npm run verify <CONTRACT_ADDRESS> --network goerli
```

## 📊 Gas Optimization

### Current Gas Usage
- **SovereignAccount deployment:** ~2,500,000 gas
- **execute():** ~45,000 gas
- **executeBatch():** ~25,000 gas per transaction (savings with batch)
- **installModule():** ~50,000 gas
- **requestRecovery():** ~75,000 gas

### Optimization Tips
1. Use `executeBatch()` for multiple transactions
2. Keep guardian count reasonable (3-5 recommended)
3. Use `viaIR` compiler optimization (enabled in config)

## 🔒 Security

### Audits
- All contracts will be audited before mainnet deployment
- Currently in development phase

### Best Practices
1. **Access Control:** All sensitive functions are owner/guardian restricted
2. **Input Validation:** All inputs are validated
3. **Reentrancy:** Uses Checks-Effects-Interactions pattern
4. **Overflow Protection:** Solidity 0.8.x has built-in overflow checks

### Bug Bounty
A bug bounty program will be launched before mainnet deployment.

## 📚 Documentation

### Contract Interfaces
```solidity
// SovereignAccount.sol
interface ISovereignAccount {
    function execute(address dest, uint256 value, bytes calldata func) external;
    function executeBatch(address[] calldata dests, uint256[] calldata values, bytes[] calldata funcs) external;
    function installModule(address module) external;
    function uninstallModule(address module) external;
    function addGuardian(address guardian) external;
    function removeGuardian(address guardian) external;
    function requestRecovery(address newOwner) external;
    function approveRecovery(uint256 requestId) external;
    function withdraw(uint256 amount) external;
}

// AaveLendingModule.sol
interface IAaveLendingModule {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount) external;
    function borrow(address token, uint256 amount) external;
    function repay(address token, uint256 amount) external;
    function getHealthFactor() external view returns (uint256);
    function getAvailableBorrow(address token) external view returns (uint256);
}
```

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.