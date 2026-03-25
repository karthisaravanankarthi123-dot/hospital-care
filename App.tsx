import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/components/SplashScreen';
import RoleSelection from './src/components/RoleSelection';
import OnboardingScreen from './src/components/OnboardingScreen';
import SignInScreen from './src/components/SignInScreen';
import MobileVerificationScreen from './src/components/MobileVerificationScreen';
import BiometricsScreen from './src/components/BiometricsScreen';
import FaceRecognitionScreen from './src/components/FaceRecognitionScreen';
import CompleteProfileScreen from './src/components/CompleteProfileScreen';
import BusinessLocationScreen from './src/components/BusinessLocationScreen';
import ManualLocationScreen from './src/components/ManualLocationScreen';
import HomeScreen from './src/components/HomeScreen';
import SearchScreen from './src/components/SearchScreen';
import ClinicDetailsScreen from './src/components/ClinicDetailsScreen';
import ShortsScreen from './src/components/ShortsScreen';
import VideoPlayerScreen from './src/components/VideoPlayerScreen';
import MembershipScreen from './src/components/MembershipScreen';
import ProfileScreen from './src/components/ProfileScreen';
import BusinessDetailsScreen from './src/components/BusinessDetailsScreen';
import PinCreationScreen from './src/components/PinCreationScreen';
import LoginScreen from './src/components/LoginScreen';
import BusinessPinLoginScreen from './src/components/BusinessPinLoginScreen';

function AppContent(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>({
    firstName: 'James',
    lastName: 'Anderson',
    businessName: 'Smile Care Clinic',
    category: 'Clinic',
  });
  const [showMobileVerification, setShowMobileVerification] = useState(false);
  const [showBiometrics, setShowBiometrics] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);
  const [showShortsScreen, setShowShortsScreen] = useState(false);
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showMembershipScreen, setShowMembershipScreen] = useState(false);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedShort, setSelectedShort] = useState<any>(null);
  const [showClinicDetails, setShowClinicDetails] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [showPinCreation, setShowPinCreation] = useState(false);
  const [showBusinessLogin, setShowBusinessLogin] = useState(false);
  const [showBusinessPinLogin, setShowBusinessPinLogin] = useState(false);
  const [registeredPin, setRegisteredPin] = useState('');
  const [lastAuthScreen, setLastAuthScreen] = useState<'biometrics' | 'face' | null>(null);
  const [authMethod, setAuthMethod] = useState<'mobile' | 'social' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedRole) return;

    const backAction = () => {
      if (showVideoPlayer) {
        setShowVideoPlayer(false);
        setSelectedShort(null);
      } else if (showProfileScreen) {
        setShowProfileScreen(false);
      } else if (showMembershipScreen) {
        setShowMembershipScreen(false);
      } else if (showClinicDetails) {
        setShowClinicDetails(false);
        setSelectedClinic(null);
      } else if (showSearchScreen) {
        setShowSearchScreen(false);
      } else if (showShortsScreen) {
        setShowShortsScreen(false);
      } else if (isLoggedIn) {
        BackHandler.exitApp();
        return true;
      } else if (showManualLocation) {
        setShowManualLocation(false);
        setShowLocation(true);
      } else if (showBusinessDetails) {
        setShowBusinessDetails(false);
        setShowLocation(true);
      } else if (showLocation) {
        setShowLocation(false);
        setShowCompleteProfile(true);
      } else if (showCompleteProfile) {
        setShowCompleteProfile(false);
        if (lastAuthScreen === 'face') {
          setShowFaceRecognition(true);
        } else {
          setShowBiometrics(true);
        }
      } else if (showFaceRecognition) {
        setShowFaceRecognition(false);
        setShowBiometrics(true);
      } else if (showBiometrics) {
        setShowBiometrics(false);
        if (authMethod === 'mobile') {
          setShowMobileVerification(true);
        }
      } else if (showBusinessPinLogin) {
        setShowBusinessPinLogin(false);
        setShowBusinessLogin(true);
      } else if (showBusinessLogin) {
        setShowBusinessLogin(false);
        setSelectedRole(null);
        setIsOnboardingFinished(false);
      } else if (showPinCreation) {
        setShowPinCreation(false);
        setShowMobileVerification(true);
      } else if (showMobileVerification) {
        setShowMobileVerification(false);
        setAuthMethod(null);
      } else if (isOnboardingFinished) {
        setIsOnboardingFinished(false);
      } else if (selectedRole) {
        setIsOnboardingFinished(true);
        setShowBusinessLogin(true);
      } else {
        setSelectedRole(null);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [
    selectedRole,
    isLoggedIn,
    isOnboardingFinished,
    showMobileVerification,
    showBiometrics,
    showFaceRecognition,
    showCompleteProfile,
    showLocation,
    showManualLocation,
    showBusinessDetails,
    lastAuthScreen,
    authMethod,
    showSearchScreen,
    showClinicDetails,
    showShortsScreen,
    showVideoPlayer,
    showMembershipScreen,
    showProfileScreen,
    showBusinessPinLogin,
    registeredPin,
  ]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    if (showMembershipScreen) {
      return (
        <MembershipScreen
          onBack={() => setShowMembershipScreen(false)}
          onContinue={(planId) => {
            console.log('Selected Plan:', planId);
            setShowMembershipScreen(false);
          }}
        />
      );
    }

    if (showProfileScreen) {
      return (
        <ProfileScreen
          role={selectedRole || 'guest'}
          userData={userData}
          onHomePress={() => setShowProfileScreen(false)}
          onSearchPress={() => {
            setShowProfileScreen(false);
            setShowSearchScreen(true);
          }}
          onShortsPress={() => {
            setShowProfileScreen(false);
            setShowShortsScreen(true);
          }}
          onBusinessDetailsPress={() => {
            setShowProfileScreen(false);
            setShowBusinessDetails(true);
          }}
          onLogout={() => {
            setIsLoggedIn(false);
            setShowProfileScreen(false);
            setShowBusinessLogin(true);
          }}
        />
      );
    }

    if (showClinicDetails && selectedClinic) {
      return (
        <ClinicDetailsScreen
          clinic={selectedClinic}
          role={selectedRole || 'guest'}
          onBack={() => {
            setShowClinicDetails(false);
            setSelectedClinic(null);
          }}
          onJoinMembership={() => setShowMembershipScreen(true)}
        />
      );
    }

    if (showVideoPlayer && selectedShort) {
      return (
        <VideoPlayerScreen
          short={selectedShort}
          onBack={() => {
            setShowVideoPlayer(false);
            setSelectedShort(null);
          }}
        />
      );
    }


    if (showShortsScreen) {
      return (
        <ShortsScreen
          role={selectedRole || 'guest'}
          onHomePress={() => setShowShortsScreen(false)}
          onSearchPress={() => {
            setShowShortsScreen(false);
            setShowSearchScreen(true);
          }}
          onShortPress={(short) => {
            setSelectedShort(short);
            setShowVideoPlayer(true);
          }}
          onProfilePress={() => {
            setShowShortsScreen(false);
            setShowProfileScreen(true);
          }}
        />
      );
    }

    if (showSearchScreen) {
      return (
        <SearchScreen
          role={selectedRole || 'guest'}
          onHomePress={() => setShowSearchScreen(false)}
          onClinicPress={(clinic) => {
            setSelectedClinic(clinic);
            setShowClinicDetails(true);
          }}
          onShortsPress={() => {
            setShowSearchScreen(false);
            setShowShortsScreen(true);
          }}
          onProfilePress={() => {
            setShowSearchScreen(false);
            setShowProfileScreen(true);
          }}
        />
      );
    }
    return (
      <HomeScreen
        role={selectedRole || 'guest'}
        userData={userData}
        onSearchPress={() => setShowSearchScreen(true)}
        onClinicPress={(clinic) => {
          setSelectedClinic(clinic);
          setShowClinicDetails(true);
        }}
        onShortsPress={() => setShowShortsScreen(true)}
        onShortPress={(short: any) => {
          setSelectedShort(short);
          setShowVideoPlayer(true);
        }}
        onProfilePress={() => setShowProfileScreen(true)}
      />
    );
  }

  if (!selectedRole) {
    return (
      <RoleSelection
        onContinue={(role) => {
          setSelectedRole(role);
          setIsOnboardingFinished(true);
          setShowBusinessLogin(true);
        }}
      />
    );
  }

  if (!isOnboardingFinished) {
    return (
      <OnboardingScreen
        onFinish={() => setIsOnboardingFinished(true)}
        onBack={() => {
          setIsOnboardingFinished(true);
          setShowBusinessLogin(true);
        }}
      />
    );
  }

  if (!isLoggedIn) {
    if (showMobileVerification) {
      return (
        <MobileVerificationScreen
          onBack={() => setShowMobileVerification(false)}
          onVerify={() => {
            setShowMobileVerification(false);
            setShowPinCreation(true);
          }}
        />
      );
    }

    if (showBiometrics) {
      return (
        <BiometricsScreen
          onBack={() => {
            setShowBiometrics(false);
            if (authMethod === 'mobile') {
              setShowMobileVerification(true);
            }
          }}
          onFinish={() => {
            setShowBiometrics(false);
            setShowCompleteProfile(true);
            setLastAuthScreen('biometrics');
          }}
          onFaceRecognition={() => {
            setShowBiometrics(false);
            setShowFaceRecognition(true);
          }}
        />
      );
    }

    if (showFaceRecognition) {
      return (
        <FaceRecognitionScreen
          onBack={() => {
            setShowFaceRecognition(false);
            setShowBiometrics(true);
          }}
          onFinish={() => {
            setShowFaceRecognition(false);
            setShowCompleteProfile(true);
            setLastAuthScreen('face');
          }}
        />
      );
    }

    if (showCompleteProfile) {
      return (
        <CompleteProfileScreen
          role={selectedRole}
          onBack={() => setShowCompleteProfile(false)}
          onComplete={(data) => {
            setUserData(data);
            setShowCompleteProfile(false);
            setShowLocation(true);
          }}
        />
      );
    }

    if (showLocation) {
      return (
        <BusinessLocationScreen
          role={selectedRole}
          onBack={() => {
            setShowLocation(false);
            setShowCompleteProfile(true);
          }}
          onFinish={() => {
            if (selectedRole === 'business') {
              setShowBusinessDetails(true);
              setShowLocation(false);
            } else {
              setShowBusinessLogin(true);
              setShowLocation(false);
            }
          }}
          onManualEntry={() => {
            setShowLocation(false);
            setShowManualLocation(true);
          }}
        />
      );
    }

    if (showBusinessDetails) {
      return (
        <BusinessDetailsScreen
          onBack={() => {
            setShowBusinessDetails(false);
            setShowLocation(true);
          }}
          onContinue={() => {
            setShowBusinessDetails(false);
            setShowBusinessLogin(true);
          }}
          onSkip={() => {
            setShowBusinessDetails(false);
            setShowBusinessLogin(true);
          }}
        />
      );
    }

    if (showManualLocation) {
      return (
        <ManualLocationScreen
          onBack={() => {
            setShowManualLocation(false);
            setShowLocation(true);
          }}
          onComplete={() => {
            if (selectedRole === 'business') {
              setShowBusinessDetails(true);
              setShowManualLocation(false);
            } else {
              setShowBusinessLogin(true);
              setShowManualLocation(false);
            }
          }}
        />
      );
    }

    if (showBusinessPinLogin) {
      return (
        <BusinessPinLoginScreen
          correctPin={registeredPin}
          onSignIn={() => {
            setShowBusinessPinLogin(false);
            setShowProfileScreen(false);
            setIsLoggedIn(true);
          }}
          onBack={() => {
            setShowBusinessPinLogin(false);
            setShowBusinessLogin(true);
          }}
          onResetPin={() => console.log('Reset PIN')}
          onForgotPin={() => console.log('Forgot PIN')}
        />
      );
    }

    if (showBusinessLogin) {
      return (
        <LoginScreen
          onLogin={(method) => {
            if (method === 'pin') {
              setShowBusinessLogin(false);
              setShowBusinessPinLogin(true);
            } else {
              setShowBusinessLogin(false);
              setShowProfileScreen(false);
              setIsLoggedIn(true);
            }
          }}
          onCreateAccount={() => {
            setShowBusinessLogin(false);
            setIsOnboardingFinished(false);
          }}
          onForgotPin={() => {
            console.log('Forgot PIN');
          }}
          onBack={() => {
            setShowBusinessLogin(false);
            setSelectedRole(null);
            setIsOnboardingFinished(false);
          }}
        />
      );
    }

    if (showPinCreation) {
      return (
        <PinCreationScreen
          onBack={() => {
            setShowPinCreation(false);
            setShowMobileVerification(true);
          }}
          onFinish={(pinValue) => {
            setRegisteredPin(pinValue);
            setShowPinCreation(false);
            setShowBiometrics(true);
            setAuthMethod('social');
          }}
        />
      );
    }

    return (
      <SignInScreen
        onBack={() => {
          setIsOnboardingFinished(false);
        }}
        onSignIn={(method) => {
          console.log('Signed in with', method);
          if (method === 'mobile') {
            setShowMobileVerification(true);
            setAuthMethod('mobile');
          } else if (method === 'pin') {
            setShowPinCreation(true);
          } else {
            setShowBiometrics(true);
            setAuthMethod('social');
          }
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.box}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setIsLoggedIn(false);
            setShowBusinessLogin(true);
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>
          You have selected the {selectedRole} role and are now signed in.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    zIndex: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1C1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default App;