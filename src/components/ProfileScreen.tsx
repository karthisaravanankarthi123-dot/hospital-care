import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({
  role,
  onHomePress,
  onSearchPress,
  onShortsPress,
  onBusinessDetailsPress,
  onLogout,
  userData,
}: {
  role: string;
  onHomePress: () => void;
  onSearchPress?: () => void;
  onShortsPress: () => void;
  onBusinessDetailsPress?: () => void;
  onLogout?: () => void;
  userData?: any;
}) => {
  const insets = useSafeAreaInsets();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const SettingItem = ({ 
    icon, 
    label, 
    value, 
    onPress, 
    rightElement,
    iconColor = "#007AFF"
  }: { 
    icon: string; 
    label: string; 
    value?: string; 
    onPress?: () => void;
    rightElement?: React.ReactNode;
    iconColor?: string;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}10` }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={iconColor} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {rightElement ? rightElement : (
        onPress && <Feather name="chevron-right" size={20} color="#A0AEC0" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={role === 'business' ? "dark-content" : "light-content"} 
        translucent={true} 
        backgroundColor="transparent" 
      />
      
      {/* Header */}
      <View style={[
        role === 'business' ? styles.headerBusiness : styles.headerNormal, 
        { paddingTop: insets.top }
      ]}>
        <View style={role === 'business' ? styles.headerContentBusiness : styles.headerContentNormal}>
          <Text style={role === 'business' ? styles.headerTitleBusiness : styles.headerTitleNormal}>Profile</Text>
          {role !== 'business' && (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerIconButton}>
                <View style={styles.notificationDot} />
                <Feather name="bell" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconButton}>
                <Feather name="menu" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
      >
        {/* Profile Header section */}
        <View style={[
          styles.profileImageSection, 
          role === 'business' && styles.profileImageSectionBusiness
        ]}>
          <View style={styles.imageWrapper}>
            {role === 'business' ? (
              <View style={styles.silhouetteContainer}>
                <MaterialCommunityIcons name="account" size={90} color="#D1E9FF" />
              </View>
            ) : (
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400' }} 
                style={styles.profileImage} 
              />
            )}
            <TouchableOpacity style={[
              styles.editImageBadge,
              role === 'business' && styles.editImageBadgeBusiness
            ]}>
              <Feather name={role === 'business' ? "edit-2" : "edit-3"} size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          <SettingItem 
            icon="account-outline" 
            label="Full Name" 
            value={(userData?.firstName || 'Sarah') + ' ' + (userData?.lastName || 'Wilson')} 
            iconColor="#007AFF"
            rightElement={<Feather name="edit-2" size={18} color="#A0AEC0" />}
          />
          <SettingItem 
            icon="email-outline" 
            label="Email" 
            value={userData?.email || 'sarahwilson@emaple.com'} 
            iconColor="#007AFF"
            rightElement={<Feather name="edit-2" size={18} color="#A0AEC0" />}
          />
          <SettingItem 
            icon="cellphone" 
            label="Mobile" 
            value={userData?.mobile || '+1 555-019-8829'} 
            iconColor="#007AFF"
            rightElement={<Feather name="edit-2" size={18} color="#A0AEC0" />}
          />
          <SettingItem 
            icon="fingerprint" 
            label="Biometric Login" 
            value="Face ID / Fingerprint" 
            iconColor="#007AFF"
            rightElement={
              <Switch 
                value={biometricEnabled} 
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#E2E8F0", true: "#007AFF" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <SettingItem 
            icon="lock-outline" 
            label="Change PIN" 
            onPress={() => {}} 
            iconColor="#007AFF"
          />
          <SettingItem 
            icon="bell-outline" 
            label="Notifications" 
            onPress={() => {}} 
            iconColor="#007AFF"
          />
          <SettingItem 
            icon="earth" 
            label="Language" 
            onPress={() => {}} 
            iconColor="#007AFF"
            rightElement={
              <View style={styles.languageSelector}>
                <Text style={styles.languageText}>English</Text>
                <Feather name="chevron-down" size={16} color="#A0AEC0" />
              </View>
            }
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={onLogout}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { bottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
          <Feather name="home" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        {role === 'business' ? (
          <>
            <TouchableOpacity style={styles.navItem} onPress={onShortsPress}>
              <MaterialCommunityIcons name="play-circle" size={24} color="#A0AEC0" />
              <Text style={styles.navText}>Shorts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={onBusinessDetailsPress}>
              <Feather name="home" size={24} color="#A0AEC0" />
              <Text style={styles.navText}>Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.navItem} onPress={onSearchPress}>
              <Feather name="search" size={24} color="#A0AEC0" />
              <Text style={styles.navText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={onShortsPress}>
              <MaterialCommunityIcons name="play-circle" size={24} color="#A0AEC0" />
              <Text style={styles.navText}>Shorts</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navActiveIndicatorPill}>
            <Feather name="user" size={24} color="#FFFFFF" />
            <Text style={styles.navTextActive}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  headerBusiness: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  headerNormal: {
    backgroundColor: '#0d1b2a',
    paddingBottom: 20,
  },
  headerContentBusiness: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerContentNormal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerTitleBusiness: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  headerTitleNormal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#0d1b2a',
    zIndex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageSectionBusiness: {
    backgroundColor: '#F0F7FF',
    marginVertical: 0,
    paddingVertical: 30,
    marginTop: -10,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  silhouetteContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E1EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editImageBadgeBusiness: {
    borderWidth: 1,
    borderColor: '#F0F2F5',
    elevation: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EBF4FF',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 16,
    color: '#1A1C1E',
    fontWeight: '700',
    marginTop: 2,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  languageText: {
    fontSize: 15,
    color: '#6C727A',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#0061FF',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    shadowColor: '#0061FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  bottomNav: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#0d1b2a',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  navActiveIndicatorPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '85%',
    height: '85%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    color: '#A0AEC0',
    marginTop: 4,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default ProfileScreen;
