# Sovereign Wallet - Architecture

## 🏗️ System Overview

Sovereign Wallet is a 100% decentralized smart contract wallet built on ERC-4337 (Account Abstraction) with social recovery capabilities.

## 🎯 Design Principles

1. **Self-Custody:** Users control their private keys
2. **Trustless:** No centralized intermediaries
3. **Censorship-Resistant:** No one can block transactions
4. **User-Friendly:** Complex crypto made simple
5. **Extensible:** Modular design for new features

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Devices                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Mobile    │  │    Web      │  │   Desktop   │        │
│  │   (React    │  │  (React)    │  │ (Electron)  │        │
│  │   Native)   │  │             │  │             │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
└─────────┼────────────────┼────────────────┼────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                WalletConnect v2 Gateway                     │
│           (Multi-wallet connectivity layer)                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              Smart Contract Layer (ERC-4337)                │
│  ┌────────────────────────────────────────────────────┐   │
│  │              SovereignAccount.sol                  │   │
│  │  • ERC-4337 Account Abstraction                   │   │
│  │  • Social Recovery (3/5 guardians)                │   │
│  │  • Module System                                  │   │
│  │  • Batch Transactions                             │   │
│  └───────────────┬───────────────────────────────────┘   │
│                  │                                       │
│  ┌───────────────┼───────────────────────────────────┐   │
│  │               ▼                                   │   │
│  │        Module Registry                            │   │
│  │  • AaveLendingModule.sol                         │   │
│  │  • UniswapSwapModule.sol                         │   │
│  │  • CompoundLendingModule.sol                     │   │
│  │  • Custom modules                                │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────────┬──────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                Blockchain Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Ethereum   │  │   Polygon   │  │  Arbitrum   │        │
│  │   Mainnet   │  │    L2       │  │     L2      │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐        │
│  │   Entry     │  │   Entry     │  │   Entry     │        │
│  │   Point     │  │   Point     │  │   Point     │        │
│  │ (ERC-4337)  │  │ (ERC-4337)  │  │ (ERC-4337)  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Core Components

### 1. Smart Contracts

#### SovereignAccount.sol
- **Purpose:** Main account contract implementing ERC-4337
- **Features:**
  - Account abstraction (no EOA required)
  - Social recovery via guardians
  - Module system for extensibility
  - Batch transaction execution
  - Gas sponsorship support

#### Module System
- **AaveLendingModule:** Deposit, borrow, repay on Aave
- **UniswapSwapModule:** Token swapping via Uniswap
- **CompoundLendingModule:** Lending on Compound
- **Custom Modules:** User-defined functionality

### 2. Frontend Applications

#### Mobile App (React Native)
- **Platforms:** iOS, Android
- **Features:**
  - Account creation/import
  - Guardian management
  - DeFi operations
  - Transaction history
  - Settings and security

#### Web App (React)
- **Platform:** Browser
- **Features:**
  - Full mobile feature set
  - Browser wallet integration
  - Advanced trading interface

#### Desktop App (Electron)
- **Platforms:** Windows, macOS, Linux
- **Features:**
  - Enhanced security features
  - Hardware wallet integration
  - Advanced portfolio management

### 3. Infrastructure

#### WalletConnect v2 Gateway
- **Purpose:** Multi-wallet connectivity
- **Supported Wallets:**
  - MetaMask
  - Rainbow
  - Trust Wallet
  - Coinbase Wallet
  - Ledger Live

#### Indexing Service (The Graph)
- **Purpose:** Efficient blockchain data querying
- **Indexed Data:**
  - Account transactions
  - Token balances
  - DeFi positions
  - Guardian activities

#### Gas Station Network
- **Purpose:** Gas sponsorship for new users
- **Features:**
  - Pay gas with tokens
  - Batch gas optimization
  - Gas price prediction

## 🔐 Security Architecture

### 1. Key Management
```
User Device → Secure Enclave → Encrypted Storage → Blockchain
      │            │                  │                  │
      │            │                  │                  │
      ▼            ▼                  ▼                  ▼
   App UI    Key Generation    Local Encryption   Signed Transactions
```

### 2. Social Recovery
```
Account Recovery Flow:
1. User loses access
2. Guardians (3/5) request recovery
3. Other guardians approve (3/5)
4. New key is generated
5. Account ownership transferred
```

### 3. Transaction Security
- **Multi-signature:** Critical operations require multiple approvals
- **Time-locks:** Large withdrawals have delay periods
- **Rate limiting:** Prevent brute force attacks
- **Circuit breakers:** Automatic pause on anomalies

## 📡 Network Architecture

### Multi-Chain Support
```
Primary Chain: Ethereum Mainnet (security)
Secondary Chains: Polygon, Arbitrum, Optimism (scalability)
Bridge: Cross-chain asset transfer
```

### Node Infrastructure
```
Load Balancer → RPC Nodes → Blockchain
      │
      ▼
   Cache Layer
      │
      ▼
   Client Apps
```

## 💾 Data Architecture

### On-Chain Data
- Account state
- Guardian addresses
- Installed modules
- Transaction history
- Recovery requests

### Off-Chain Data (Encrypted)
- User preferences
- Contact lists
- Transaction labels
- App settings
- Local cache

### Indexed Data (The Graph)
- Aggregated balances
- Historical analytics
- DeFi positions
- Gas usage statistics

## 🔄 Transaction Flow

### Standard Transaction
```
1. User initiates transaction in app
2. App builds UserOperation (ERC-4337)
3. User signs with private key
4. App sends to Bundler
5. Bundler packages and sends to EntryPoint
6. EntryPoint validates and executes
7. Transaction confirmed on blockchain
8. App updates UI with result
```

### Social Recovery Transaction
```
1. User requests recovery
2. Guardians approve (3/5)
3. New key pair generated
4. Recovery transaction signed by guardians
5. Account ownership transferred
6. User notified of successful recovery
```

## 🚀 Deployment Architecture

### Development
```
Local Network (Hardhat) → Test Contracts → Development App
```

### Testing
```
Testnets (Goerli, Mumbai) → Audited Contracts → Beta App
```

### Production
```
Mainnets (Ethereum, Polygon) → Verified Contracts → Production App
```

## 📈 Scaling Strategy

### Horizontal Scaling
- Multiple RPC endpoints
- Load-balanced indexers
- CDN for static assets
- Distributed caching

### Vertical Scaling
- Optimized contract gas usage
- Efficient frontend rendering
- Smart batching of transactions
- L2 rollup integration

## 🔍 Monitoring & Analytics

### Performance Monitoring
- Transaction success rates
- Gas usage optimization
- Network latency
- User engagement metrics

### Security Monitoring
- Unusual transaction patterns
- Failed recovery attempts
- Module installation/removal
- Guardian activity

### Business Analytics
- User growth metrics
- Feature adoption rates
- Revenue generation
- Market trends

## 🛡️ Disaster Recovery

### Contract Upgrades
- Timelock-controlled upgrades
- Emergency pause functionality
- Migration paths for users
- Backward compatibility

### Data Recovery
- Encrypted backups
- Social recovery system
- Multi-device sync
- Export/import functionality

### Service Continuity
- Multi-cloud infrastructure
- Geographic redundancy
- Automated failover
- Regular backup testing

## 🔮 Future Architecture

### Planned Improvements
1. **ZK-Rollup Integration:** Enhanced privacy and scalability
2. **Cross-Chain Messaging:** Seamless multi-chain operations
3. **DeFi Aggregator:** Best rates across protocols
4. **NFT Management:** Native NFT support
5. **DAO Governance:** Community-driven development

### Research Areas
- **MPC Wallets:** Distributed key generation
- **Privacy Pools:** Transaction privacy
- **AI Security:** Anomaly detection
- **Quantum Resistance:** Post-quantum cryptography

---

*This architecture document will evolve as the project develops. Last updated: April 2026*