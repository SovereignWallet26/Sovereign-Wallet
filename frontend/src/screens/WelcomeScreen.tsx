import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleImportAccount = () => {
    // TODO: Implement import account flow
    console.log('Import account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Logo and Title */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoText}>SW</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Sovereign Wallet</Text>
            <Text style={styles.subtitle}>
              Your keys, your money.{'\n'}No intermediaries, no KYC.
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🔐</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Self-Custody</Text>
                <Text style={styles.featureDescription}>
                  You control your private keys. Not us, not anyone else.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>👥</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Social Recovery</Text>
                <Text style={styles.featureDescription}>
                  Friends can help recover your account if you lose access.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>⚡</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>DeFi Integrated</Text>
                <Text style={styles.featureDescription}>
                  Lend, borrow, and swap directly from your wallet.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🌐</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Multi-Chain</Text>
                <Text style={styles.featureDescription}>
                  Ethereum, Polygon, and more. All in one wallet.
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleCreateAccount}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Create New Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleImportAccount}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Import Existing Account</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By continuing, you agree to our{' '}
              <Text style={styles.disclaimerLink}>Terms</Text> and{' '}
              <Text style={styles.disclaimerLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 'auto',
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  disclaimerLink: {
    color: '#6366F1',
    textDecorationLine: 'underline',
  },
});