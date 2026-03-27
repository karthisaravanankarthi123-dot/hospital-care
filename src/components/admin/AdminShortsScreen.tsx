import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminShortsScreen = ({ onBack, onNavigate }: any) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Pending (41)');

  const tabs = ['Pending (41)', 'Approved', 'Rejected'];

  const shorts = [
    {
      id: '1',
      title: '5 Key Stretches for Lower Back Pain',
      user: 'City Dental Care',
      time: 'Uploaded 2h ago',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070&auto=format&fit=crop',
      status: 'PENDING',
      duration: '0:45',
    },
    // More shorts can be added here
  ];

  const renderShortItem = ({ item }: { item: any }) => (
    <View style={styles.shortCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <View style={styles.topBadges}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={styles.durationBadge}>
            <Feather name="clock" size={10} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.playButton}>
          <Feather name="play" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.shortInfo}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder} />
            <View>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.uploadTime}>{item.time}</Text>
            </View>
          </View>
          <Text style={styles.shortTitle}>{item.title}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
              <Feather name="check-circle" size={18} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
              <Feather name="x-circle" size={18} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Shorts Review</Text>
          <Text style={styles.headerSubtitle}>15 Pending</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={22} color="#FFFFFF" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onBack}>
            <Feather name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Clinics</Text>
          <Feather name="chevron-down" size={16} color="#4A5568" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Newest First</Text>
          <Feather name="align-left" size={16} color="#4A5568" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={16} color="#007AFF" />
          <Text style={[styles.filterButtonText, { color: '#007AFF' }]}>Time</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shorts}
        renderItem={renderShortItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Home')}>
          <Feather name="home" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Shorts')}>
          <Feather name="play-circle" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Shorts</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#1A2B3C',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  activeTabText: {
    color: '#007AFF',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  shortCard: {
    height: 500,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: 'space-between',
  },
  topBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  shortInfo: {
    marginTop: 'auto',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A5568',
    marginRight: 10,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  uploadTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
  shortTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#2DCE89',
  },
  rejectButton: {
    backgroundColor: '#F5365C',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
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

export default AdminShortsScreen;
