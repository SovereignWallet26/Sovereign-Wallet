# Sovereign Wallet - Frontend

React Native frontend for Sovereign Wallet, a 100% decentralized wallet with ERC-4337 and social recovery.

## 📱 Features

- **Modern UI/UX:** Clean, intuitive interface with dark theme
- **Wallet Management:** Create, import, and manage accounts
- **Social Recovery:** Add/remove guardians, request recovery
- **DeFi Integration:** Lend, borrow, swap tokens
- **Multi-chain Support:** Ethereum, Polygon, and more
- **Transaction History:** View and track all transactions
- **Gas Optimization:** Batch transactions, gas sponsorship

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Expo CLI (optional)

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Building
```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── screens/           # App screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── CreateAccountScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── LendBorrowScreen.tsx
│   │   ├── SwapScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation configuration
│   ├── store/            # State management (Zustand)
│   ├── utils/            # Utility functions
│   └── constants/        # App constants
├── assets/               # Images, fonts, icons
└── App.tsx              # App entry point
```

## 🛠️ Tech Stack

### Core
- **React Native:** Cross-platform mobile development
- **Expo:** Development platform and tools
- **TypeScript:** Type safety and better developer experience

### Navigation
- **React Navigation:** Routing and navigation
- **Stack Navigator:** Screen transitions
- **Bottom Tabs:** Main app navigation

### State Management
- **Zustand:** Simple, fast state management
- **AsyncStorage:** Persistent storage

### Web3 Integration
- **ethers.js:** Ethereum interaction library
- **WalletConnect:** Multi-wallet connectivity
- **viem:** Type-safe Ethereum library
- **wagmi:** React hooks for Ethereum

### UI & Styling
- **React Native Styles:** Native styling
- **expo-linear-gradient:** Gradient backgrounds
- **react-native-vector-icons:** Icon library
- **react-native-reanimated:** Smooth animations

## 📱 Screens

### 1. Welcome Screen
- App introduction
- Feature highlights
- Create/import account options

### 2. Create Account Screen
- Set up new account
- Add guardians (3-10)
- Deploy smart contract

### 3. Dashboard Screen
- Account overview
- Token balances
- Quick actions
- Recent transactions

### 4. Lend/Borrow Screen
- Deposit tokens to Aave
- Borrow against collateral
- Health factor monitoring
- Interest rates

### 5. Swap Screen
- Token swapping via Uniswap
- Slippage settings
- Gas optimization
- Transaction history

### 6. Settings Screen
- Account management
- Guardian management
- Network selection
- Security settings

## 🔧 Development

### Environment Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Scan QR code with Expo Go app
```

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Testing
```bash
# Run tests
npm run test

# Run tests in watch mode
npm test -- --watch
```

## 📱 Platform Specific

### iOS
```bash
# Install iOS dependencies
cd ios && pod install

# Run on iOS simulator
npm run ios
```

### Android
```bash
# Make sure Android Studio is installed
# Create an Android Virtual Device (AVD)

# Run on Android emulator
npm run android
```

## 🔗 Blockchain Integration

### Networks
- **Localhost:** http://localhost:8545
- **Goerli:** Ethereum testnet
- **Mumbai:** Polygon testnet
- **Mainnet:** Ethereum mainnet (future)

### Smart Contracts
- **SovereignAccount:** Main account contract
- **AaveLendingModule:** DeFi lending module
- **UniswapModule:** Token swapping module

### Wallet Connectivity
- **WalletConnect v2:** Multi-wallet support
- **MetaMask:** Browser extension
- **Rainbow:** Mobile wallet
- **Trust Wallet:** Mobile wallet

## 🎨 Design System

### Colors
```typescript
const colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  background: '#0F0F23',
  surface: '#1A1A2E',
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};
```

### Typography
- **Headline:** 32px, bold
- **Title:** 24px, semibold
- **Body:** 16px, regular
- **Caption:** 14px, regular
- **Label:** 12px, medium

### Spacing
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px

## 📦 Building for Production

### Expo Build Service
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Standalone Builds
```bash
# Android APK
expo build:android

# iOS IPA
expo build:ios
```

## 🔒 Security

### Best Practices
1. **Never store private keys:** Use secure enclave or hardware security module
2. **Validate all inputs:** Sanitize user inputs and contract calls
3. **Use HTTPS:** All API calls should be encrypted
4. **Regular updates:** Keep dependencies updated
5. **Code review:** All changes should be reviewed

### Secure Storage
- **iOS:** Keychain Services
- **Android:** Keystore System
- **Cross-platform:** Expo SecureStore

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.