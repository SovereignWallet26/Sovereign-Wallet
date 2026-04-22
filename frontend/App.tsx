import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LendBorrowScreen from './src/screens/LendBorrowScreen';
import SwapScreen from './src/screens/SwapScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Store
import useStore from './src/store/useStore';

// Types
import type { RootStackParamList } from './src/navigation/types';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const { isInitialized, initializeApp } = useStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize app (load saved state, connect to blockchain, etc.)
        await initializeApp();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [initializeApp]);

  if (!isInitialized) {
    return null; // Keep showing splash screen
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#0F0F23' },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="LendBorrow" component={LendBorrowScreen} />
          <Stack.Screen name="Swap" component={SwapScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}