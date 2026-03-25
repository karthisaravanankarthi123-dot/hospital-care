import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

interface SignInScreenProps {
  onBack: () => void;
  onSignIn: (method: string) => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onBack, onSignIn }) => {
  const insets = useSafeAreaInsets();

  const AUTH_METHODS = [
    {
      id: 'mobile',
      title: 'Mobile Number',
      description: 'OTP-based verification',
      icon: 'smartphone',
      iconFamily: 'Feather',
    },
    {
      id: 'pin',
      title: 'Create PIN',
      description: 'Classic login',
      icon: 'lock',
      iconFamily: 'Feather',
    },
  ];

  const SOCIAL_METHODS = [
    { id: 'google', title: 'Continue with Google', icon: 'google', color: '#DB4437' },
    { id: 'apple', title: 'Continue with Apple', icon: 'apple1', color: '#000000' },
    { id: 'facebook', title: 'Continue with Facebook', icon: 'facebook-square', color: '#4267B2' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#1A1C1E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Sign in with</Text>
        <Text style={styles.subtitle}>Choose your preferred authentication method</Text>

        <View style={styles.methodsContainer}>
          {AUTH_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.methodCard}
              onPress={() => onSignIn(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.methodIconContainer}>
                <Feather name={method.icon as any} size={22} color="#007AFF" />
              </View>
              <View style={styles.methodTextContainer}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          {SOCIAL_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.socialButton}
              onPress={() => onSignIn(method.id)}
              activeOpacity={0.7}
            >
              {method.id === 'google' ? (
                <View style={[styles.socialIconWrapper, styles.googleIconContainer]}>
                  <Image
                    source={require('../../assets/google.png')}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                </View>
              ) : method.id === 'apple' ? (
                <View style={[styles.socialIconWrapper, styles.appleIconContainer]}>
                  <AntDesign name="apple1" size={22} color="#FFFFFF" />
                </View>
              ) : (
                <View style={[styles.socialIconWrapper, styles.facebookIconContainer]}>
                  <Image
                    source={require('../../assets/facebook_icon.png')}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                </View>
              )}
              <Text style={styles.socialText}>{method.title}</Text>
              <Feather name="chevron-right" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    marginBottom: 40,
    lineHeight: 24,
  },
  methodsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#A1A5AC',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E4E8',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#A1A5AC',
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  socialIconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden', // Add this to ensure images respect borderRadius
  },
  socialIconImage: {
    width: '100%',
    height: '100%',
  },
  googleIconContainer: {
    backgroundColor: '#FFFFFF',
    // Border removed as the new asset includes it
  },
  appleIconContainer: {
    backgroundColor: '#1A1C1E',
    borderRadius: 10,
  },
  facebookIconContainer: {
    backgroundColor: '#1877F2',
    // Facebook circle styling can be achieved if the image is square
    borderRadius: 20,
  },
  socialText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1C1E',
  },
});

export default SignInScreen;
