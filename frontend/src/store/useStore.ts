import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppState, Account, Token, Transaction } from '../navigation/types';

interface Store extends AppState {
  // Actions
  initializeApp: () => Promise<void>;
  createAccount: (owner: string, guardians: string[]) => Promise<void>;
  importAccount: (address: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  executeTransaction: (to: string, value: string, data: string) => Promise<string>;
  executeBatch: (transactions: Array<{ to: string; value: string; data: string }>) => Promise<string[]>;
  addToken: (token: Token) => void;
  removeToken: (address: string) => void;
  updateBalance: (address: string, balance: string) => void;
  addTransaction: (transaction: Transaction) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      account: null,
      isInitialized: false,
      isConnected: false,
      network: 'goerli',
      tokens: [],
      transactions: [],
      loading: false,
      error: null,

      // Actions
      initializeApp: async () => {
        try {
          set({ loading: true });
          
          // Check if account exists in storage
          // In a real app, you would also check blockchain connection, etc.
          
          // Simulate initialization delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ isInitialized: true, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to initialize app',
            loading: false 
          });
        }
      },

      createAccount: async (owner: string, guardians: string[]) => {
        try {
          set({ loading: true });
          
          // In a real app, you would:
          // 1. Deploy SovereignAccount contract
          // 2. Store the contract address
          // 3. Initialize with owner and guardians
          
          // Simulate deployment delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const newAccount: Account = {
            address: '0x' + Math.random().toString(16).substr(2, 40), // Mock address
            owner,
            guardians: guardians.map(addr => ({ address: addr })),
            modules: [],
            balance: '0',
            network: 'goerli',
          };
          
          set({ 
            account: newAccount,
            isConnected: true,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create account',
            loading: false 
          });
        }
      },

      importAccount: async (address: string) => {
        try {
          set({ loading: true });
          
          // In a real app, you would:
          // 1. Validate the address
          // 2. Load account data from blockchain
          // 3. Check if user has access
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const importedAccount: Account = {
            address,
            owner: address, // For imported accounts, owner is the address itself
            guardians: [],
            modules: [],
            balance: '0',
            network: 'goerli',
          };
          
          set({ 
            account: importedAccount,
            isConnected: true,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to import account',
            loading: false 
          });
        }
      },

      connectWallet: async () => {
        try {
          set({ loading: true });
          
          // In a real app, you would:
          // 1. Connect via WalletConnect or similar
          // 2. Get user's address
          // 3. Load account data
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For now, just set connected state
          set({ isConnected: true, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to connect wallet',
            loading: false 
          });
        }
      },

      disconnectWallet: () => {
        set({ 
          account: null,
          isConnected: false,
          tokens: [],
          transactions: [] 
        });
      },

      executeTransaction: async (to: string, value: string, data: string) => {
        try {
          set({ loading: true });
          
          // In a real app, you would:
          // 1. Build transaction
          // 2. Sign with user's key
          // 3. Send to blockchain
          // 4. Wait for confirmation
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const txHash = '0x' + Math.random().toString(16).substr(2, 64);
          
          const newTransaction: Transaction = {
            hash: txHash,
            from: get().account?.address || '',
            to,
            value,
            timestamp: Date.now(),
            status: 'success',
          };
          
          set(state => ({
            transactions: [newTransaction, ...state.transactions],
            loading: false
          }));
          
          return txHash;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Transaction failed',
            loading: false 
          });
          throw error;
        }
      },

      executeBatch: async (transactions) => {
        try {
          set({ loading: true });
          
          // In a real app, you would batch transactions
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const txHashes = transactions.map(() => 
            '0x' + Math.random().toString(16).substr(2, 64)
          );
          
          const newTransactions: Transaction[] = transactions.map((tx, index) => ({
            hash: txHashes[index],
            from: get().account?.address || '',
            to: tx.to,
            value: tx.value,
            timestamp: Date.now(),
            status: 'success',
          }));
          
          set(state => ({
            transactions: [...newTransactions, ...state.transactions],
            loading: false
          }));
          
          return txHashes;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Batch transaction failed',
            loading: false 
          });
          throw error;
        }
      },

      addToken: (token: Token) => {
        set(state => {
          // Check if token already exists
          const exists = state.tokens.some(t => 
            t.address.toLowerCase() === token.address.toLowerCase()
          );
          
          if (exists) {
            return state;
          }
          
          return {
            tokens: [...state.tokens, token]
          };
        });
      },

      removeToken: (address: string) => {
        set(state => ({
          tokens: state.tokens.filter(token => 
            token.address.toLowerCase() !== address.toLowerCase()
          )
        }));
      },

      updateBalance: (address: string, balance: string) => {
        set(state => ({
          tokens: state.tokens.map(token => 
            token.address.toLowerCase() === address.toLowerCase()
              ? { ...token, balance }
              : token
          )
        }));
      },

      addTransaction: (transaction: Transaction) => {
        set(state => ({
          transactions: [transaction, ...state.transactions]
        }));
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'sovereign-wallet-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        account: state.account,
        network: state.network,
        tokens: state.tokens,
        transactions: state.transactions,
      }),
    }
  )
);

export default useStore;