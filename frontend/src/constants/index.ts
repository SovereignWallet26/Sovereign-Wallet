// App constants
export const APP_NAME = 'Sovereign Wallet';
export const APP_VERSION = '0.1.0';
export const APP_DESCRIPTION = 'A 100% decentralized smart contract wallet';

// Network constants
export const NETWORKS = {
  GOERLI: {
    id: 5,
    name: 'Goerli',
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/demo',
    explorer: 'https://goerli.etherscan.io',
    currency: 'ETH',
  },
  MUMBAI: {
    id: 80001,
    name: 'Mumbai',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
    explorer: 'https://mumbai.polygonscan.com',
    currency: 'MATIC',
  },
  SEPOLIA: {
    id: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    explorer: 'https://sepolia.etherscan.io',
    currency: 'ETH',
  },
} as const;

// Contract addresses (testnet)
export const CONTRACT_ADDRESSES = {
  // EntryPoint for ERC-4337 (same across networks)
  ENTRY_POINT: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
  
  // SovereignAccount will be deployed per user
  SOVEREIGN_ACCOUNT: 'DEPLOY_PER_USER',
  
  // Aave V3 Pool (Polygon Mumbai)
  AAVE_POOL: '0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B',
  
  // Common tokens (testnet)
  TOKENS: {
    WETH: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    AAVE: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
  },
} as const;

// Social recovery constants
export const SOCIAL_RECOVERY = {
  MIN_GUARDIANS: 3,
  MAX_GUARDIANS: 10,
  RECOVERY_TIMEOUT: 48 * 60 * 60 * 1000, // 48 hours in milliseconds
} as const;

// UI constants
export const UI = {
  COLORS: {
    PRIMARY: '#6366F1',
    SECONDARY: '#8B5CF6',
    BACKGROUND: '#0F0F23',
    SURFACE: '#1A1A2E',
    TEXT: '#FFFFFF',
    TEXT_SECONDARY: '#94A3B8',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  TYPOGRAPHY: {
    HEADLINE: 32,
    TITLE: 24,
    SUBTITLE: 18,
    BODY: 16,
    CAPTION: 14,
    LABEL: 12,
  },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  ACCOUNT: 'sovereign-wallet-account',
  SETTINGS: 'sovereign-wallet-settings',
  TOKENS: 'sovereign-wallet-tokens',
  TRANSACTIONS: 'sovereign-wallet-transactions',
  NETWORK: 'sovereign-wallet-network',
} as const;

// Error messages
export const ERRORS = {
  NETWORK: {
    CONNECTION_FAILED: 'Failed to connect to network',
    WRONG_NETWORK: 'Please switch to the correct network',
    RPC_ERROR: 'RPC connection error',
  },
  TRANSACTION: {
    FAILED: 'Transaction failed',
    REJECTED: 'Transaction rejected by user',
    TIMEOUT: 'Transaction timeout',
    INSUFFICIENT_GAS: 'Insufficient gas',
  },
  ACCOUNT: {
    NOT_FOUND: 'Account not found',
    NOT_CONNECTED: 'Account not connected',
    RECOVERY_FAILED: 'Account recovery failed',
  },
  VALIDATION: {
    INVALID_ADDRESS: 'Invalid address',
    INVALID_AMOUNT: 'Invalid amount',
    INSUFFICIENT_BALANCE: 'Insufficient balance',
  },
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_SOCIAL_RECOVERY: true,
  ENABLE_DEFI: true,
  ENABLE_MULTICHAIN: false, // Coming soon
  ENABLE_GAS_SPONSORSHIP: false, // Coming soon
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  NETWORK: NETWORKS.GOERLI.id,
  CURRENCY: 'USD',
  LANGUAGE: 'en',
  THEME: 'dark',
  NOTIFICATIONS: true,
  AUTO_LOCK: 5 * 60 * 1000, // 5 minutes in milliseconds
} as const;