import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  BackHandler,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const ROLES = [
  {
    id: 'business',
    title: 'Business User',
    description: 'Handle your daily business activities in one place.',
    color: '#007AFF',
    icon: 'briefcase',
    localIcon: require('../../assets/business_user.png'),
  },
  {
    id: 'member',
    title: 'Member',
    description: 'Find Nearby you, View full details',
    color: '#34C759',
    icon: 'user',
    localIcon: require('../../assets/member_user.png'),
  },
  {
    id: 'guest',
    title: 'Guest User',
    description: 'Find Nearby you, View full details',
    color: '#AF52DE',
    icon: 'user-plus',
    localIcon: require('../../assets/guest_user.png'),
  },
];

const RoleSelection = ({ onContinue }: { onContinue: (role: string) => void }) => {
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const handleBackPress = () => {
      console.log('Back button pressed on RoleSelection');
      BackHandler.exitApp();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 24 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Are you?</Text>
          <Text style={styles.subtitle}>Select your role to continue with the right access</Text>
        </View>

        <View style={styles.rolesContainer}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                { borderLeftColor: role.color },
                selectedRole === role.id && styles.selectedCard
              ]}
              onPress={() => {
                setSelectedRole(role.id);
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${role.color}15` }]}>
                {/* Fallback to Image if Feather fails or for premium look */}
                <Image source={role.localIcon} style={styles.roleIcon} resizeMode="contain" />
              </View>
              
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedRole === role.id && { borderColor: role.color }
              ]}>
                {selectedRole === role.id && <View style={[styles.radioInner, { backgroundColor: role.color }]} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedRole && styles.disabledButton
          ]} 
          onPress={() => selectedRole && onContinue(selectedRole)}
          activeOpacity={selectedRole ? 0.8 : 1}
          disabled={!selectedRole}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.continueText}>Continue</Text>
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
    backgroundColor: '#F0F7FF', // Light blue background from image
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  roleIcon: {
    width: 32,
    height: 32,
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
  },
  rolesContainer: {
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  selectedCard: {
    shadowOpacity: 0.1,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: '#6C727A',
    lineHeight: 18,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#F0F7FF',
  },
  continueButton: {
    backgroundColor: '#007AFF', // Solid blue from image
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
  disabledButton: {
    backgroundColor: '#A0CCFF',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
