import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Switch,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminProfileScreen = ({ onBack, onNavigate, onLogout, onNotifications, onChangePin }: any) => {
  const insets = useSafeAreaInsets();
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={64} color="#CBD5E0" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Feather name="edit-2" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          {/* Full Name */}
          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="user" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Full Name</Text>
              <Text style={styles.settingValue}>Sarah Wilson</Text>
            </View>
            <TouchableOpacity>
              <Feather name="edit-2" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="mail" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Email</Text>
              <Text style={styles.settingValue}>sarahwilson@emaple.com</Text>
            </View>
            <TouchableOpacity>
              <Feather name="edit-2" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Biometric Login */}
          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="aperture" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitleText}>Biometric Login</Text>
              <Text style={styles.settingSubtext}>Face ID / Fingerprint</Text>
            </View>
            <Switch
              value={isBiometricEnabled}
              onValueChange={setIsBiometricEnabled}
              trackColor={{ false: '#E2E8F0', true: '#007AFF' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : (isBiometricEnabled ? '#FFFFFF' : '#F7FAFC')}
            />
          </View>

          {/* Change PIN */}
          <TouchableOpacity style={styles.settingItem} onPress={onChangePin}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="lock" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitleText}>Change PIN</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CBD5E0" />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity style={styles.settingItem} onPress={onNotifications}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="bell" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitleText}>Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CBD5E0" />
          </TouchableOpacity>

          {/* Language */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
              <Feather name="globe" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitleText}>Language</Text>
            </View>
            <View style={styles.languageSelect}>
              <Text style={styles.languageText}>English</Text>
              <Feather name="chevron-down" size={18} color="#A0AEC0" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Home')}>
          <Feather name="home" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Shorts')}>
          <Feather name="play-circle" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Shorts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Plans')}>
          <Feather name="calendar" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Users')}>
          <Feather name="shield" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Profile')}>
          <Feather name="user" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Profile</Text>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E1F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F7FF',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2BC3',
  },
  settingTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  settingSubtext: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F7FAFC',
    marginVertical: 10,
  },
  languageSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  languageText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A2B3C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AdminProfileScreen;
