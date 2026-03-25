import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const BiometricsScreen = ({
  onBack,
  onFinish,
  onFaceRecognition,
}: {
  onBack: () => void;
  onFinish: () => void;
  onFaceRecognition: () => void;
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
        <Text style={styles.title}>Enable Biometrics</Text>
        <Text style={styles.subtitle}>Faster, more secure login for next time</Text>

        <View style={styles.illustrationContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Feather name="layers" size={64} color="#007AFF" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Fingerprint Login</Text>
          <Text style={styles.infoDescription}>
            Place your finger on the sensor to register your fingerprint for quick access.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onFinish}>
          <Text style={styles.primaryButtonText}>Enable Fingerprint</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onFaceRecognition}>
          <Text style={styles.secondaryButtonText}>Use Face Recognition</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={onFinish}>
          <Text style={styles.skipText}>Skip for now</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    textAlign: 'center',
    marginBottom: 60,
    width: '100%',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  outerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#D0E6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#B0D6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  infoDescription: {
    fontSize: 15,
    color: '#6C727A',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
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
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E1E4E8',
  },
  secondaryButtonText: {
    color: '#6C727A',
    fontSize: 17,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: '#6C727A',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BiometricsScreen;
