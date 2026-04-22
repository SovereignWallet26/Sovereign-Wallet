# Sovereign Wallet

A 100% decentralized smart contract wallet with ERC-4337 and social recovery.

## 🎯 Vision
"Your keys, your money. No intermediaries, no KYC, no censorship."

## ✨ Features
- ✅ **ERC-4337 Account Abstraction** - No seed phrases, social recovery
- ✅ **Social Recovery** - 5 guardians can recover your account
- ✅ **Plug-in DeFi Modules** - Aave, Uniswap, Compound as "apps"
- ✅ **Multi-chain Native** - Same account on Ethereum + L2s
- ✅ **100% Open Source** - Fully auditable, self-custody only
- ✅ **Gas Optimization** - Batch transactions, sponsored gas

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- MetaMask or other Web3 wallet (for testing)

### Installation
```bash
# Clone repository
git clone https://github.com/SovereignWallet26/Sovereign-Wallet
cd Sovereign-Wallet

# Install dependencies
npm install

# Run tests
npm run test

# Start development
npm run dev
```

## 📁 Project Structure

```
sovereign-wallet/
├── contracts/           # Smart contracts (Solidity)
├── frontend/           # React Native app
├── docs/               # Documentation
└── .github/            # CI/CD workflows
```

## 🛠 Development

### Smart Contracts
```bash
cd contracts
npm install
npm run compile
npm run test
npm run deploy:goerli
```

### Frontend App
```bash
cd frontend
npm install
npm run ios    # iOS simulator
npm run android # Android emulator
npm run web    # Web version
```

## 🔗 Networks

### Testnets
- **Goerli:** `0x...` (Ethereum testnet)
- **Mumbai:** `0x...` (Polygon testnet)
- **Sepolia:** `0x...` (Ethereum testnet)

### Mainnets (Future)
- **Ethereum:** Security and high-value transactions
- **Polygon:** Low-cost everyday transactions
- **Arbitrum/Optimism:** L2 scaling solutions

## 📚 Documentation

- [Architecture](./docs/architecture.md) - Technical design
- [API Reference](./docs/api.md) - Contract interfaces
- [User Guide](./docs/user-guide.md) - How to use the wallet
- [Security](./docs/security.md) - Audit reports, bug bounty

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a Pull Request

## 🐛 Bug Reports

Found a bug? Please open an [issue](https://github.com/SovereignWallet26/Sovereign-Wallet/issues) with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🔒 Security

Security is our top priority. Please report security issues to `security@sovereignwallet.xyz`.

- **Audits:** All contracts are audited before mainnet deployment
- **Bug Bounty:** Up to $50,000 for critical vulnerabilities
- **Transparency:** All code is open source and verifiable

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Ethereum Foundation for ERC-4337
- OpenZeppelin for secure contract libraries
- Argent Wallet for social recovery inspiration
- All our contributors and supporters

## 📞 Contact

- **Website:** https://sovereignwallet.xyz (coming soon)
- **Twitter:** [@SovereignWallet](https://twitter.com/SovereignWallet)
- **Telegram:** [t.me/sovereignwallet](https://t.me/sovereignwallet)
- **Email:** hello@sovereignwallet.xyz

---

**Built with ❤️ for the decentralized future.**