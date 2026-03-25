import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (method: 'biometric' | 'pin' | 'social') => void;
  onCreateAccount: () => void;
  onForgotPin: () => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onCreateAccount,
  onForgotPin,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="#1A1C1E" />
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/login.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.welcomeTitle}>Welcome!</Text>

        <View style={styles.authContainer}>
          <View style={styles.biometricHeader}>
            <View style={styles.biometricCircleOuter}>
              <TouchableOpacity
                style={styles.biometricCircle}
                onPress={() => onLogin('biometric')}
              >
                <Ionicons name="scan-outline" size={32} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.biometricLabel}>Face ID</Text>
            </View>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }} style={styles.socialIcon} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.fingerprintButton}
            onPress={() => onLogin('biometric')}
          >
            <Text style={styles.fingerprintButtonText}>Login With Fingerprint</Text>
            <MaterialCommunityIcons name="fingerprint" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.pinRow}>
            <TouchableOpacity onPress={() => onLogin('pin')}>
              <Text style={styles.pinLink}>Or, login with PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPin}>
              <Text style={styles.forgotPinLink}>Forgot PIN ?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here? </Text>
            <TouchableOpacity onPress={onCreateAccount}>
              <Text style={styles.createAccountLink}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 140,
    height: 48,
  },
  illustrationContainer: {
    alignItems: 'center',
    height: 280,
    justifyContent: 'center',
  },
  illustration: {
    width: width * 0.8,
    height: '100%',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1C1E',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  authContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 85,
    marginTop: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  biometricHeader: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  biometricCircleOuter: {
    alignItems: 'center',
    gap: 8,
  },
  biometricCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  biometricLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E4E8',
  },
  dividerText: {
    color: '#A1A5AC',
    fontSize: 14,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    width: (width - 64) / 3,
    justifyContent: 'center',
    gap: 6,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  fingerprintButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  fingerprintButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pinLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  forgotPinLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#A1A5AC',
    fontSize: 15,
  },
  createAccountLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default LoginScreen;
