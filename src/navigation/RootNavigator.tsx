import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import RoleSelection from '../components/RoleSelection';
import OnboardingScreen from '../components/OnboardingScreen';
import SignInScreen from '../components/SignInScreen';
import MobileVerificationScreen from '../components/MobileVerificationScreen';
import BiometricsScreen from '../components/BiometricsScreen';
import FaceRecognitionScreen from '../components/FaceRecognitionScreen';
import CompleteProfileScreen from '../components/CompleteProfileScreen';
import BusinessLocationScreen from '../components/BusinessLocationScreen';
import ManualLocationScreen from '../components/ManualLocationScreen';
import HomeScreen from '../components/HomeScreen';
import SearchScreen from '../components/SearchScreen';
import ClinicDetailsScreen from '../components/ClinicDetailsScreen';
import ShortsScreen from '../components/ShortsScreen';
import VideoPlayerScreen from '../components/VideoPlayerScreen';
import MembershipScreen from '../components/MembershipScreen';
import ProfileScreen from '../components/ProfileScreen';
import BusinessDetailsScreen from '../components/BusinessDetailsScreen';
import DetailsScreen from '../components/BusineessuserDetailsScreen';
import BusinessShortsScreen from '../components/BusinessShortsScreen';
import BusinessAllShortsScreen from '../components/BusinessAllShortsScreen';
import ShortsGenerateScreen from '../components/AIShortGenerateScreen';
import PinCreationScreen from '../components/PinCreationScreen';
import LoginScreen from '../components/LoginScreen';
import BusinessPinLoginScreen from '../components/BusinessPinLoginScreen';
import AIPreviewScreen from '../components/AIPreviewScreen';
import PublishSettingsScreen from '../components/PublishSettingsScreen';
import ChangePinScreen from '../components/ChangePinScreen';
import PaymentScreen from '../components/PaymentScreen';
import PaymentSuccessScreen from '../components/PaymentSuccessScreen';

// Admin Components
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminShortsScreen from '../components/admin/AdminShortsScreen';
import AdminPlansScreen from '../components/admin/AdminPlansScreen';
import AdminUsersScreen from '../components/admin/AdminUsersScreen';
import AdminProfileScreen from '../components/admin/AdminProfileScreen';
import AdminCreatePlanScreen from '../components/admin/AdminCreatePlanScreen';
import AdminPaymentsScreen from '../components/admin/AdminPaymentsScreen';
import AdminNotificationsScreen from '../components/admin/AdminNotificationsScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      
      <Stack.Screen name="LoginScreen">
        {(props: any) => (
          <LoginScreen
            {...props}
            onLogin={(method: string) => {
              if (method === 'pin') props.navigation.navigate('BusinessPinLoginScreen');
              else props.navigation.navigate('HomeScreen', { role: 'business' });
            }}
            onCreateAccount={() => props.navigation.navigate('RoleSelection')}
            onForgotPin={() => console.log('Forgot PIN')}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BusinessPinLoginScreen">
        {(props: any) => (
          <BusinessPinLoginScreen
            {...props}
            correctPin="1234"
            onSignIn={(pin: string) => {
              // Admin PIN check logic from App.tsx
              if (pin === '8778') {
                props.navigation.navigate('AdminDashboard');
              } else {
                props.navigation.navigate('HomeScreen', { role: 'business' });
              }
            }}
            onBack={() => props.navigation.goBack()}
            onResetPin={() => {}}
            onForgotPin={() => {}}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="RoleSelection">
        {(props: any) => (
          <RoleSelection
            onContinue={(role: string) => props.navigation.navigate('OnboardingScreen', { role })}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="OnboardingScreen">
        {(props: any) => (
          <OnboardingScreen
            onFinish={() => props.navigation.navigate('SignInScreen')}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignInScreen">
        {(props: any) => (
          <SignInScreen
            onBack={() => props.navigation.goBack()}
            onSignIn={(method: string) => {
              if (method === 'mobile') props.navigation.navigate('MobileVerificationScreen');
              else if (method === 'pin') props.navigation.navigate('PinCreationScreen');
              else props.navigation.navigate('BiometricsScreen');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="MobileVerificationScreen">
        {(props: any) => (
          <MobileVerificationScreen
            onBack={() => props.navigation.goBack()}
            onVerify={() => props.navigation.navigate('PinCreationScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PinCreationScreen">
        {(props: any) => (
          <PinCreationScreen
            onBack={() => props.navigation.goBack()}
            onFinish={(pin: string) => props.navigation.navigate('BiometricsScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BiometricsScreen">
        {(props: any) => (
          <BiometricsScreen
            onBack={() => props.navigation.goBack()}
            onFinish={() => props.navigation.navigate('CompleteProfileScreen')}
            onFaceRecognition={() => props.navigation.navigate('FaceRecognitionScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="FaceRecognitionScreen">
        {(props: any) => (
          <FaceRecognitionScreen
            onBack={() => props.navigation.goBack()}
            onFinish={() => props.navigation.navigate('CompleteProfileScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="CompleteProfileScreen">
        {(props: any) => (
          <CompleteProfileScreen
            role={props.route.params?.role || 'guest'}
            onBack={() => props.navigation.goBack()}
            onComplete={(data: any) => {
              if (props.route.params?.role === 'business') {
                props.navigation.navigate('BusinessDetails', { userData: data });
              } else {
                props.navigation.navigate('HomeScreen', { userData: data });
              }
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BusinessDetails">
        {(props: any) => (
          <BusinessDetailsScreen
            onBack={() => props.navigation.goBack()}
            onContinue={() => props.navigation.navigate('BusinessLocationScreen', { role: 'business' })}
            onSkip={() => props.navigation.navigate('BusinessLocationScreen', { role: 'business' })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BusinessLocationScreen">
        {(props: any) => (
          <BusinessLocationScreen
            role={props.route.params?.role || 'guest'}
            onBack={() => props.navigation.goBack()}
            onFinish={() => {
              if (props.route.params?.role === 'business') {
                props.navigation.navigate('MembershipScreen');
              } else {
                props.navigation.navigate('HomeScreen');
              }
            }}
            onManualEntry={() => props.navigation.navigate('ManualLocationScreen', { role: props.route.params?.role })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ManualLocationScreen">
        {(props: any) => (
          <ManualLocationScreen
            onBack={() => props.navigation.goBack()}
            onComplete={() => {
              if (props.route.params?.role === 'business') {
                props.navigation.navigate('MembershipScreen');
              } else {
                props.navigation.navigate('HomeScreen');
              }
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="HomeScreen">
        {(props: any) => (
          <HomeScreen
            {...props}
            role={props.route.params?.role || 'guest'}
            userData={props.route.params?.userData || {}}
            onSearchPress={() => props.navigation.navigate('SearchScreen')}
            onShortsPress={() => props.navigation.navigate('ShortsScreen')}
            onProfilePress={() => props.navigation.navigate('ProfileScreen')}
            onClinicPress={(clinic: any) => props.navigation.navigate('ClinicDetailsScreen', { clinic })}
            onDetailsPress={() => props.navigation.navigate('DetailsScreen')}
            onLogout={() => props.navigation.replace('LoginScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="DetailsScreen">
        {(props: any) => (
          <DetailsScreen
            {...props}
            onHomePress={() => props.navigation.navigate('HomeScreen')}
            onShortsPress={() => props.navigation.navigate('ShortsScreen')}
            onProfilePress={() => props.navigation.navigate('ProfileScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SearchScreen">
        {(props: any) => (
          <SearchScreen
            {...props}
            role={props.route.params?.role || 'guest'}
            onHomePress={() => props.navigation.navigate('HomeScreen')}
            onClinicPress={(clinic: any) => props.navigation.navigate('ClinicDetailsScreen', { clinic })}
            onShortsPress={() => props.navigation.navigate('ShortsScreen')}
            onProfilePress={() => props.navigation.navigate('ProfileScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ShortsScreen">
        {(props: any) => (
          <ShortsScreen
            {...props}
            role={props.route.params?.role || 'guest'}
            onHomePress={() => props.navigation.navigate('HomeScreen')}
            onSearchPress={() => props.navigation.navigate('SearchScreen')}
            onProfilePress={() => props.navigation.navigate('ProfileScreen')}
            onDetailsPress={() => props.navigation.navigate('DetailsScreen')}
            onShortPress={(short: any) => props.navigation.navigate('VideoPlayerScreen', { short })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="VideoPlayerScreen">
        {(props: any) => (
          <VideoPlayerScreen
            {...props}
            short={props.route.params?.short}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ClinicDetailsScreen">
        {(props: any) => (
          <ClinicDetailsScreen
            {...props}
            clinic={props.route.params?.clinic}
            onBack={() => props.navigation.goBack()}
            onJoinMembership={() => props.navigation.navigate('MembershipScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="MembershipScreen">
        {(props: any) => (
          <MembershipScreen
            onBack={() => props.navigation.goBack()}
            onContinue={(plan: any) => props.navigation.navigate('PaymentScreen', { selectedPlan: plan })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ProfileScreen">
        {(props: any) => (
          <ProfileScreen
            {...props}
            role={props.route.params?.role || 'guest'}
            userData={props.route.params?.userData || {}}
            onHomePress={() => props.navigation.navigate('HomeScreen')}
            onShortsPress={() => props.navigation.navigate('ShortsScreen')}
            onLogout={() => props.navigation.replace('LoginScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BusinessShorts">
        {(props: any) => (
          <BusinessShortsScreen
            {...props}
            onBack={() => props.navigation.goBack()}
            onShortGenerate={() => props.navigation.navigate('ShortGenerateScreen')}
            onAllShorts={() => props.navigation.navigate('BusinessAllShorts')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="BusinessAllShorts">
        {(props: any) => (
          <BusinessAllShortsScreen
            {...props}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ShortGenerateScreen">
        {(props: any) => (
          <ShortsGenerateScreen
            {...props}
            onBack={() => props.navigation.goBack()}
            onGenerate={() => props.navigation.navigate('AIPreviewScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AIPreviewScreen">
        {(props: any) => (
          <AIPreviewScreen
            {...props}
            onBack={() => props.navigation.goBack()}
            onEdit={() => props.navigation.navigate('ShortGenerateScreen')}
            onSettings={() => props.navigation.navigate('PublishSettingsScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PublishSettingsScreen">
        {(props: any) => (
          <PublishSettingsScreen
            {...props}
            onBack={() => props.navigation.goBack()}
            onPublish={() => props.navigation.navigate('BusinessShorts')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ChangePinScreen">
        {(props: any) => (
          <ChangePinScreen
            {...props}
            onBack={() => props.navigation.goBack()}
            onFinish={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PaymentScreen">
        {(props: any) => (
          <PaymentScreen
            {...props}
            selectedPlan={props.route.params?.selectedPlan}
            onBack={() => props.navigation.goBack()}
            onPay={() => props.navigation.replace('PaymentSuccessScreen')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PaymentSuccessScreen">
        {(props: any) => (
          <PaymentSuccessScreen
            {...props}
            onGoToDashboard={() => props.navigation.replace('LoginScreen')}
            onDownloadReceipt={() => console.log('Download Receipt')}
            planDetails={props.route.params?.planDetails || { title: 'Pro', price: '$29.99' }}
          />
        )}
      </Stack.Screen>

      {/* Admin Screens */}
      <Stack.Screen name="AdminDashboard">
        {(props: any) => (
          <AdminDashboard
            {...props}
            onLogout={() => props.navigation.replace('LoginScreen')}
            onNavigate={(screen: string) => props.navigation.navigate(`Admin${screen}`)}
            onNotifications={() => props.navigation.navigate('AdminNotifications')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminShorts">
        {(props: any) => (
          <AdminShortsScreen 
            {...props} 
            onBack={() => props.navigation.goBack()} 
            onNavigate={(screen: string) => props.navigation.navigate(`Admin${screen}`)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminPlans">
        {(props: any) => (
          <AdminPlansScreen 
            {...props} 
            onBack={() => props.navigation.goBack()} 
            onNavigate={(screen: string) => props.navigation.navigate(`Admin${screen}`)}
            onCreatePlan={() => props.navigation.navigate('AdminCreatePlan')}
            onViewMorePayments={() => props.navigation.navigate('AdminPayments')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminUsers">
        {(props: any) => (
          <AdminUsersScreen 
            {...props} 
            onBack={() => props.navigation.goBack()} 
            onNavigate={(screen: string) => props.navigation.navigate(`Admin${screen}`)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminProfile">
         {(props: any) => (
           <AdminProfileScreen 
             {...props} 
             onBack={() => props.navigation.goBack()} 
             onNavigate={(screen: string) => props.navigation.navigate(`Admin${screen}`)}
             onLogout={() => props.navigation.replace('LoginScreen')}
             onNotifications={() => props.navigation.navigate('AdminNotifications')}
             onChangePin={() => props.navigation.navigate('ChangePinScreen')}
           />
         )}
      </Stack.Screen>

      <Stack.Screen name="AdminCreatePlan">
         {(props: any) => <AdminCreatePlanScreen {...props} onBack={() => props.navigation.goBack()} />}
      </Stack.Screen>

      <Stack.Screen name="AdminPayments">
         {(props: any) => <AdminPaymentsScreen {...props} onBack={() => props.navigation.goBack()} />}
      </Stack.Screen>
      
      <Stack.Screen name="AdminNotifications">
        {(props: any) => <AdminNotificationsScreen {...props} onBack={() => props.navigation.goBack()} />}
      </Stack.Screen>

    </Stack.Navigator>
  );
};
