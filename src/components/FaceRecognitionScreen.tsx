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

const FaceRecognitionScreen = ({
  onBack,
  onFinish,
}: {
  onBack: () => void;
  onFinish: () => void;
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
        <Text style={styles.title}>Face Recognition</Text>
        <Text style={styles.subtitle}>Position your face inside the frame</Text>

        <View style={styles.illustrationContainer}>
          <View style={styles.dashedCircle}>
            <Feather name="user" size={80} color="#007AFF" />
            <View style={styles.bracketTopLeft} />
            <View style={styles.bracketTopRight} />
            <View style={styles.bracketBottomLeft} />
            <View style={styles.bracketBottomRight} />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.scanningText}>Scanning...</Text>
          <Text style={styles.infoDescription}>
            Keep your face centred and well-lit for accurate recognition.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onFinish}>
          <Text style={styles.primaryButtonText}>Activate Face ID</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
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
  dashedCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bracketTopLeft: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#007AFF',
    borderTopLeftRadius: 8,
  },
  bracketTopRight: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#007AFF',
    borderTopRightRadius: 8,
  },
  bracketBottomLeft: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#007AFF',
    borderBottomLeftRadius: 8,
  },
  bracketBottomRight: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#007AFF',
    borderBottomRightRadius: 8,
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scanningText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 20,
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

export default FaceRecognitionScreen;
