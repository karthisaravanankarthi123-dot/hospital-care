import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const COUNTRIES = [
  { id: 'us', name: 'United States', flag: '🇺🇸', code: '+1' },
  { id: 'in', name: 'India', flag: '🇮🇳', code: '+91' },
  { id: 'ae', name: 'UAE', flag: '🇦🇪', code: '+971' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
];

const MobileVerificationScreen = ({
  onBack,
  onVerify,
}: {
  onBack: () => void;
  onVerify: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [autoRead, setAutoRead] = useState(true);
  const [timer, setTimer] = useState(45);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    // OTP Countdown Timer - only runs if OTP has been sent
    let interval: ReturnType<typeof setInterval>;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isOtpSent]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSendOtp = () => {
    if (phoneNumber.length >= 7) {
      // Simple validation
      setIsOtpSent(true);
      setTimer(45);
      // Reset OTP fields if needed
      setOtp(['', '', '', '']);
    } else {
      console.log('Please enter a valid phone number');
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(45);
      // Logic for resending OTP
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#6C727A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>
          {"We'll send a secure OTP to your registered number"}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <View style={styles.phoneInputRow}>
            <TouchableOpacity
              style={styles.countryPicker}
              onPress={() => setShowCountryPicker(true)}
              activeOpacity={0.7}
            >
              <View style={styles.countryContent}>
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.countryCode}>{selectedCountry.code}</Text>
                <Feather name="chevron-down" size={16} color="#6C727A" />
              </View>
            </TouchableOpacity>

            <View style={styles.numberInputContainer}>
              <TextInput
                style={styles.numberInput}
                placeholder="555-019-8829"
                placeholderTextColor="#A0AEC0"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TouchableOpacity
                style={[
                  styles.checkIconContainer,
                  !phoneNumber && { opacity: 0.5 },
                ]}
                onPress={handleSendOtp}
              >
                <Feather name="check-circle" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.otpSection}>
          <Text style={styles.otpLabel}>Enter 4-digit code</Text>
          <View style={styles.otpRow}>
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.otpBox}>
                <TextInput
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(text) => {
                    const newOtp = [...otp];
                    newOtp[index] = text;
                    setOtp(newOtp);
                  }}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={isOtpSent ? handleResend : handleSendOtp}
            disabled={isOtpSent && timer > 0}
          >
            <Text style={styles.resendText}>
              {"Didn't receive code? "}
              <Text
                style={[
                  styles.resendLink,
                  isOtpSent && timer > 0 && styles.resendLinkDisabled,
                ]}
              >
                {!isOtpSent
                  ? 'Tap tick to send'
                  : timer > 0
                  ? `Resend in ${formatTime(timer)}`
                  : 'Resend Now'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.autoReadContainer}
          onPress={() => setAutoRead(!autoRead)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, autoRead && styles.checkboxActive]}>
            {autoRead && <Feather name="check" size={14} color="#FFFFFF" />}
          </View>
          <View style={styles.autoReadTextContainer}>
            <Text style={styles.autoReadTitle}>Auto-read enabled</Text>
            <Text style={styles.autoReadSubtitle}>
              OTP will be filled automatically
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Feather name="x" size={24} color="#1A1C1E" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryPicker(false);
                  }}
                >
                  <Text style={styles.itemFlag}>{item.flag}</Text>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
          <View style={styles.buttonContent}>
            <Text style={styles.verifyText}>Verify & Continue</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
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
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 48,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C727A',
    marginBottom: 12,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  countryPicker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  countryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  numberInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 56,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    paddingLeft: 16,
  },
  numberInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1C1E',
    fontWeight: '500',
  },
  checkIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  otpSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  otpLabel: {
    fontSize: 15,
    color: '#6C727A',
    marginBottom: 20,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpBox: {
    width: 56,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1C1E',
    textAlign: 'center',
    width: '100%',
  },
  resendButton: {
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#6C727A',
  },
  resendLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: '#6C727A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  itemFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1C1E',
    fontWeight: '500',
  },
  itemCode: {
    fontSize: 16,
    color: '#6C727A',
    fontWeight: '600',
  },
  autoReadContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5F1FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#007AFF',
  },
  autoReadTextContainer: {
    flex: 1,
  },
  autoReadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 2,
  },
  autoReadSubtitle: {
    fontSize: 12,
    color: '#6C727A',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifyText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default MobileVerificationScreen;
