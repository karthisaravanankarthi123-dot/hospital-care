import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminDashboard = ({ onLogout, onNavigate, onNotifications }: any) => {
  const insets = useSafeAreaInsets();
  const [showMenu, setShowMenu] = React.useState(false);

  const stats = [
    { title: 'Total Users', value: '12,481', change: '+ 3.1% vs last month', color: '#4CAF50' },
    { title: 'Monthly Revenue', value: '$48.2K', change: '+ 8.1% vs last month', color: '#4CAF50' },
    { title: 'Pending Shorts', value: '41', change: 'Needs review', color: '#FF9800', isAlert: true },
    { title: 'Total Shorts', value: '98.7K', change: '+ 8.1% vs last month', color: '#4CAF50' },
  ];

  const categories = [
    { name: 'Clinics', percentage: 78, color: '#007AFF' },
    { name: 'Doctors', percentage: 55, color: '#4CD964' },
    { name: 'Ambulance Service', percentage: 32, color: '#FF9500' },
    { name: 'Pharmacy', percentage: 18, color: '#FF3B30' },
  ];

  const signupData = [
    { day: 'Sun', value: 30 },
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 50 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 90 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=james' }}
            style={styles.avatar}
          />
          <View style={styles.userText}>
            <Text style={styles.userName}>James Anderson</Text>
            <Text style={styles.userRole}>Beaver Health AI Admin</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={onNotifications}>
            <Feather name="bell" size={22} color="#FFFFFF" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Feather name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu Overlay */}
      {showMenu && (
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={[styles.menuDropdown, { top: insets.top + 60 }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                onNavigate('Profile');
              }}
            >
              <Feather name="user" size={18} color="#1A2B3C" />
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                onLogout();
              }}
            >
              <Feather name="log-out" size={18} color="#FF3B30" />
              <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <View style={styles.statChangeRow}>
                {stat.isAlert && <Feather name="alert-triangle" size={12} color={stat.color} style={{ marginRight: 4 }} />}
                <Text style={[styles.statChange, { color: stat.color }]}>{stat.change}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* New Signups Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>New signups last 7 days</Text>
          <View style={styles.chartContainer}>
            {signupData.map((item, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      { height: item.value, backgroundColor: index === signupData.length - 1 ? '#007AFF' : '#C0D9F2' }
                    ]}
                  />
                  <Text style={styles.barValue}>{item.day === 'Sat' ? '98.7K' : '98.7K'}</Text>
                </View>
                <Text style={styles.chartLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Content Categories */}
        <View style={styles.categoriesCard}>
          <Text style={styles.cardTitle}>Content categories</Text>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryRow}>
              <View style={styles.categoryNameContainer}>
                <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                <Text style={styles.categoryName}>{cat.name}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${cat.percentage}%`, backgroundColor: cat.color }]} />
                </View>
                <Text style={styles.percentageText}>{cat.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Home')}>
          <Feather name="home" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Home</Text>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 12,
    marginRight: 12,
  },
  userText: {
    justifyContent: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
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
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 48) / 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statTitle: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A2B3C',
    marginBottom: 8,
  },
  statChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 11,
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingBottom: 10,
  },
  chartColumn: {
    alignItems: 'center',
    width: (width - 80) / 7,
  },
  barWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 120,
    width: '100%',
  },
  bar: {
    width: 25,
    borderRadius: 4,
  },
  barValue: {
    fontSize: 6,
    color: '#718096',
    position: 'absolute',
    top: -15,
  },
  chartLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 8,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  menuDropdown: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 150,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2B3C',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  categoriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1A2B3C',
    fontWeight: '500',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A2B3C',
    width: 35,
    textAlign: 'right',
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
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

export default AdminDashboard;
