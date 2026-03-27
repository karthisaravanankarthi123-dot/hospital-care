import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminUsersScreen = ({ onBack, onNavigate }: any) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All (12,481)');

  const stats = [
    { label: 'Total Users', value: '12,481', trend: '↑ 12%', trendColor: '#2DCE89' },
    { label: 'Members', value: '9,682', trend: '↑ 8%', trendColor: '#2DCE89' },
    { label: 'Business User', value: '2,799', trend: '↑ 0.4%', trendColor: '#2DCE89' },
  ];

  const tabs = ['All (12,481)', 'Clinic Pro', 'Free', 'Business'];

  const users = [
    { id: '1', name: 'Sarah Reynolds', date: 'Mar 2026', status: 'Starter', initials: 'SR', color: '#EBF4FF', textColor: '#007AFF' },
    { id: '2', name: 'James Mitchell', date: 'Jan 2026', status: 'Premium', initials: 'JM', color: '#E6FFFA', textColor: '#38B2AC' },
    { id: '3', name: 'Linda Williams', date: 'Dec 2025', status: 'Starter', initials: 'LW', color: '#FFF5F5', textColor: '#F56565' },
    { id: '4', name: 'Ryan Kim', date: 'Nov 2025', status: 'Premium', initials: 'RK', color: '#EBF4FF', textColor: '#007AFF' },
    { id: '5', name: 'Jessica Smith', date: 'Dec 2025', status: 'Premium', initials: 'JS', color: '#E6FFFA', textColor: '#38B2AC' },
    { id: '6', name: 'Michael Tan', date: 'Jan 2026', status: 'Premium', initials: 'MT', color: '#F7FAFC', textColor: '#718096' },
    { id: '7', name: 'Jessica Smith', date: 'Dec 2025', status: 'Premium', initials: 'JS', color: '#E6FFFA', textColor: '#38B2AC' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Premium':
        return { bg: '#EBFBEE', text: '#2DCE89' };
      case 'Starter':
        return { bg: '#EBF4FF', text: '#007AFF' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>All Users</Text>
          <Text style={styles.headerSubtitle}>12,481 Total Registered</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section with Dark Background */}
        <View style={styles.darkStatsSection}>
          <View style={styles.statsRow}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statTrend, { color: stat.trendColor }]}>{stat.trend}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.usersContainer}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#A0AEC0" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search members..."
              placeholderTextColor="#A0AEC0"
            />
          </View>

          {/* Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.tabsContainer}
            contentContainerStyle={{ gap: 8 }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* User List */}
          <View style={styles.userListCard}>
            {users.map((user, index) => {
              const statusStyle = getStatusStyle(user.status);
              return (
                <View key={user.id} style={[
                  styles.userItem,
                  index < users.length - 1 && styles.borderBottom
                ]}>
                  <View style={[styles.avatar, { backgroundColor: user.color }]}>
                    <Text style={[styles.initials, { color: user.textColor }]}>{user.initials}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.date}>{user.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {user.status}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

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
          <Feather name="shield" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Profile')}>
          <Feather name="user" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#1A2B3C',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitleContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#A0AEC0',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  darkStatsSection: {
    backgroundColor: '#1A2B3C',
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 4,
    textAlign: 'center',
  },
  statTrend: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  usersContainer: {
    paddingHorizontal: 16,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F7F9FC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1A1C1E',
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#718096',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  userListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  initials: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  date: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
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

export default AdminUsersScreen;
