export type RootStackParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  Dashboard: undefined;
  LendBorrow: undefined;
  Swap: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  DeFi: undefined;
  Swap: undefined;
  Settings: undefined;
};

// Account types
export interface Guardian {
  address: string;
  name?: string;
  ens?: string;
}

export interface Account {
  address: string;
  owner: string;
  guardians: Guardian[];
  modules: string[];
  balance: string;
  network: string;
}

// Transaction types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
}

// DeFi types
export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  price?: number;
}

export interface LendingPosition {
  token: Token;
  supplied: string;
  borrowed: string;
  healthFactor: number;
  availableBorrow: string;
}

// App state
export interface AppState {
  account: Account | null;
  isInitialized: boolean;
  isConnected: boolean;
  network: string;
  tokens: Token[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}