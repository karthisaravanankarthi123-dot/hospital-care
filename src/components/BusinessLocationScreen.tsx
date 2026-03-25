import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const BusinessLocationScreen = ({
  role,
  onBack,
  onFinish,
  onManualEntry,
}: {
  role: string | null;
  onBack: () => void;
  onFinish: () => void;
  onManualEntry: () => void;
}) => {
  const insets = useSafeAreaInsets();

  // Hardware Back Button handled by App.tsx

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#6C727A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={[styles.circle, styles.circle3]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle1]} />
          <View style={styles.markerContainer}>
            <Feather name="map-pin" size={48} color="#007AFF" />
          </View>
        </View>

        <Text style={styles.title}>
          {role === 'business'
            ? 'Your Business Location'
            : role === 'member'
              ? 'Your Location'
              : 'Your Location'}
        </Text>
        <Text style={styles.subtitle}>
          {role === 'business'
            ? 'We need your business location to show your services to nearby customers.'
            : role === 'member'
              ? 'We need your location to show nearby clinics and services relevant to you.'
              : 'We need your location to help you find health services nearby as a user.'}
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onFinish}>
          <Feather
            name="crosshair"
            size={20}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
          <Text style={styles.primaryButtonText}>
            Auto-detect Current Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onManualEntry}>
          <Text style={styles.secondaryButtonText}>
            Enter Location Manually
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  circle1: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  circle2: {
    width: 200,
    height: 200,
  },
  circle3: {
    width: 260,
    height: 260,
    borderColor: 'rgba(0, 122, 255, 0.05)',
  },
  markerContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1C1E',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 10,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BusinessLocationScreen;
