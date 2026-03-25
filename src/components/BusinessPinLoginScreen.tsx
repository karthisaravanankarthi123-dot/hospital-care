import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

interface BusinessPinLoginScreenProps {
  correctPin: string;
  onSignIn: () => void;
  onBack: () => void;
  onResetPin: () => void;
  onForgotPin: () => void;
}

const BusinessPinLoginScreen: React.FC<BusinessPinLoginScreenProps> = ({
  correctPin,
  onSignIn,
  onBack,
  onResetPin,
  onForgotPin,
}) => {
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }
    if (pin === correctPin) {
      onSignIn();
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const isFormValid = pin.length === 4;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="#6C727A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Set PIN credentials</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter PIN</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 4-digit PIN"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  secureTextEntry={!showPin}
                  maxLength={4}
                  value={pin}
                  onChangeText={(text) => {
                    setPin(text.replace(/[^0-9]/g, ''));
                    setError('');
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPin(!showPin)}
                >
                  <Feather
                    name={showPin ? 'eye' : 'eye-off'}
                    size={20}
                    color="#A0AEC0"
                  />
                </TouchableOpacity>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <View style={styles.linksRow}>
              <TouchableOpacity onPress={onResetPin}>
                <Text style={styles.linkText}>Reset PIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onForgotPin}>
                <Text style={styles.linkText}>Forgot PIN?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <TouchableOpacity
            style={[
              styles.signInButton,
              !isFormValid && styles.signInButtonDisabled,
            ]}
            onPress={handleSignIn}
            disabled={!isFormValid}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.signInButtonText}>Sign In</Text>
              <Feather name="arrow-right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 10,
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
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#001A33',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    marginBottom: 40,
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    paddingHorizontal: 16,
    height: 60,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#1A1C1E',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 8,
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  signInButton: {
    backgroundColor: '#007AFF',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default BusinessPinLoginScreen;
