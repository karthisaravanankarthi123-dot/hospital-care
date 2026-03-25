import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.content}>
        <View style={styles.logoAndTitle}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/beaver_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Beaver</Text>
          <Text style={styles.titleBold}>HealthAI</Text>
        </View>

        <Text style={styles.subtitle}>HEALTHCARE PLATFORM</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                { width: progressWidth },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>INITIALISING...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1931', // Dark blue background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoAndTitle: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#041938ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 1,
  },
  titleBold: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -5,
  },
  subtitle: {
    color: '#8a9ab0',
    fontSize: 14,
    letterSpacing: 3,
    marginTop: 40,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginTop: 60,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3ac5a9', // Teal color for progress
    borderRadius: 2,
  },
  loadingText: {
    color: '#8a9ab0',
    fontSize: 12,
    marginTop: 15,
    letterSpacing: 1,
  },
});

export default SplashScreen;
