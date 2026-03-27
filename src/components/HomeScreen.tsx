import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  BackHandler,
  Keyboard,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeIcon, ShortsIcon, DetailsIcon, ProfileIcon } from './NavigationIcons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  {
    id: '1',
    title: 'Clinic',
    icon: 'home-plus',
    color: '#007AFF',
    active: true,
  },
  {
    id: '2',
    title: 'Find Doctor',
    icon: 'stethoscope',
    color: '#007AFF',
    active: false,
  },
  {
    id: '3',
    title: 'Ambulance',
    icon: 'ambulance',
    color: '#007AFF',
    active: false,
  },
  {
    id: '4',
    title: 'Pharmachy',
    icon: 'pill',
    color: '#007AFF',
    active: false,
  },
];

const CLINICS = [
  {
    id: '1',
    name: 'Smile Care Clinic',
    specialty: 'Dental, Orthodontics',
    distance: '0.8 km',
    status: 'Open',
    color: '#34C759',
  },
  {
    id: '2',
    name: 'Smile Care Clinic',
    specialty: 'Dental, Orthodontics',
    distance: '0.8 km',
    status: 'Closed',
    color: '#FF3B30',
  },
];

const SHORTS = [
  { id: '1', duration: '0:30', views: '612', title: 'Braces Guide' },
  { id: '2', duration: '0:60', views: '715', title: 'Cavity Prevention' },
  { id: '3', duration: '0:30', views: '812', title: 'Kids Dentistry' },
];

const HomeScreen = ({
  role = 'guest',
  onBack,
  onSearchPress,
  onClinicPress,
  onShortsPress,
  onShortPress,
  onProfilePress,
  onDetailsPress,
  onLogout,
  userData,
}: {
  role?: string;
  onBack?: () => void;
  onSearchPress?: () => void;
  onClinicPress: (clinic: any) => void;
  onShortsPress: () => void;
  onShortPress?: (short: any) => void;
  onProfilePress: () => void;
  onDetailsPress?: () => void;
  onLogout?: () => void;
  userData?: any;
}) => {
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Hardware Back Button handled by App.tsx

  const renderBusinessDashboard = () => (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={[styles.businessHeaderContainer, { paddingTop: insets.top }]}
      >
        <View style={styles.businessHeader}>
          <View style={styles.businessProfileInfo}>
            <View style={styles.businessAvatar}>
              <Text style={styles.avatarLetter}>
                {(userData?.businessName || 'S').charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.businessWelcomeText}>WELCOME!</Text>
              <Text style={styles.businessName}>
                {userData?.businessName || 'Smile Care Clinic'}
              </Text>
              <View style={styles.locationBadgeContainer}>
                <View style={styles.locationBadge}>
                  <View style={styles.locationDot} />
                  <Text style={styles.locationBadgeText}>
                    {(userData?.category || 'CLINIC').toUpperCase()} · NEW YORK
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Feather name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.businessScrollContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
        style={{ flex: 1 }}
        bounces={true}
      >
        {/* What's on your mind? */}
        <View style={styles.actionBarCard}>
          <View style={styles.inputRow}>
            <Feather name="edit-3" size={20} color="#A0AEC0" />
            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor="#A0AEC0"
              style={styles.actionBarInput}
            />
          </View>
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionItem}>
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: '#EBF4FF' },
                ]}
              >
                <Feather name="clock" size={20} color="#007AFF" />
              </View>
              <Text style={styles.actionLabel}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: '#E6FFFA' },
                ]}
              >
                <Feather name="image" size={20} color="#38B2AC" />
              </View>
              <Text style={styles.actionLabel}>Post Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: '#FFF5F5' },
                ]}
              >
                <Feather name="video" size={20} color="#F56565" />
              </View>
              <Text style={styles.actionLabel}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: '#FAF5FF' },
                ]}
              >
                <MaterialCommunityIcons
                  name="star-four-points-outline"
                  size={20}
                  color="#9F7AEA"
                />
              </View>
              <Text style={styles.actionLabel}>AI</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Performance Overview */}
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>Performance Overview</Text>
            <TouchableOpacity style={styles.viewReportButton}>
              <Text style={styles.viewReportText}>View Report</Text>
              <Feather name="arrow-right" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>Total Shorts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>3.2k</Text>
              <Text style={styles.statLabel}>Profile Visitors</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>1k</Text>
              <Text style={styles.statLabel}>Contact Clicks</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>505</Text>
              <Text style={styles.statLabel}>Total Followers</Text>
            </View>
          </View>
        </View>

        {/* Complete Your Profile */}
        <View style={styles.completeProfileCard}>
          <View style={styles.completeProfileIcon}>
            <Feather name="file-text" size={24} color="#007AFF" />
          </View>
          <View style={styles.completeProfileContent}>
            <Text style={styles.completeProfileTitle}>
              Complete Your Profile
            </Text>
            <Text style={styles.completeProfileSubtitle}>
              Add clinic hours & speciality to reach more patients
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressPercentage}>75% complete</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription */}
        <View style={styles.businessSubscriptionCard}>
          <View style={styles.subInfo}>
            <Text style={styles.businessSubTitle}>Subscription</Text>
            <Text style={styles.businessSubDetail}>Renews on Apr 3, 2026</Text>
            <View style={styles.yearlyPlanBadge}>
              <Ionicons name="star" size={12} color="#FFFFFF" />
              <Text style={styles.yearlyPlanText}>Yearly Plan · Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.businessManageButton}>
            <Text style={styles.businessManageText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {!isKeyboardVisible && (
        <View
          style={[
            styles.businessBottomNav,
            { bottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navActivePill}>
              <HomeIcon active={true} size={24} />
              <Text style={styles.navActiveText}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={onShortsPress}
          >
            <ShortsIcon active={false} size={24} />
            <Text style={styles.navInactiveText}>Shorts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={onDetailsPress}
          >
            <DetailsIcon active={false} size={24} />
            <Text style={styles.navInactiveText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={onProfilePress}
          >
            <ProfileIcon active={false} size={24} />
            <Text style={styles.navInactiveText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderPatientDashboard = () => (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={[styles.stickyHeaderContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=james' }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.welcomeText}>WELCOME !</Text>
              <Text style={styles.userName}>
                {(userData?.firstName || 'James') + ' ' + (userData?.lastName || 'Anderson')}
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.notificationDot} />
              <Feather name="bell" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Feather name="menu" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.locationSelector}>
              <Feather name="map-pin" size={18} color="#FFFFFF" />
              <Text style={styles.locationText}>New York</Text>
              <Feather name="chevron-down" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="microphone"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
        style={{ flex: 1 }}
        bounces={true}
      >
        <View style={styles.mainContent}>
          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.horizontalScrollPadding}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  cat.active && styles.categoryCardActive,
                ]}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    cat.active && styles.categoryIconActive,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={cat.icon as any}
                    size={28}
                    color={cat.active ? '#FFFFFF' : '#007AFF'}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryTitle,
                    cat.active && styles.categoryTitleActive,
                  ]}
                >
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Nearby Clinics */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Clinics</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {CLINICS.map((clinic) => (
            <TouchableOpacity
              key={clinic.id}
              style={styles.clinicCard}
              onPress={() => onClinicPress && onClinicPress(clinic)}
              activeOpacity={0.7}
            >
              <View style={styles.clinicImageContainer}>
                <MaterialCommunityIcons
                  name="heart-flash"
                  size={40}
                  color="#007AFF"
                />
              </View>
              <View style={styles.clinicInfo}>
                <Text style={styles.clinicName}>{clinic.name}</Text>
                <Text style={styles.clinicSpecialty}>{clinic.specialty}</Text>
                <View style={styles.clinicStatusRow}>
                  <Text style={styles.distanceText}>{clinic.distance}</Text>
                  <View
                    style={[styles.statusDot, { backgroundColor: clinic.color }]}
                  />
                  <Text style={[styles.statusText, { color: clinic.color }]}>
                    {clinic.status}
                  </Text>
                </View>
              </View>
              <View style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <Feather name="arrow-right" size={14} color="#007AFF" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Shorts Feed */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shorts Feed</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.shortsScroll}
            contentContainerStyle={styles.horizontalScrollPadding}
          >
            {SHORTS.map((short) => (
              <TouchableOpacity
                key={short.id}
                style={styles.shortItem}
                onPress={() => onShortPress && onShortPress(short)}
                activeOpacity={0.7}
              >
                <View style={styles.shortThumbnail}>
                  <View style={styles.aiBadge}>
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={10}
                      color="#FFFFFF"
                    />
                    <Text style={styles.aiText}>AI</Text>
                  </View>
                  <View style={styles.playIconContainer}>
                    <Ionicons
                      name="play"
                      size={24}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </View>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{short.duration}</Text>
                  </View>
                </View>
                <View style={styles.shortInfo}>
                  <View style={styles.viewCountRow}>
                    <Feather name="eye" size={12} color="#1A1C1E" />
                    <Text style={styles.viewCountText}> {short.views}</Text>
                  </View>
                  <Text style={styles.shortTitle}>{short.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Subscription Card */}
          <View style={styles.subscriptionCard}>
            {/* Background Decorative Circles */}
            <View style={styles.subCircleSmall} />
            <View style={styles.subCircleLarge} />

            <View style={styles.subLeft}>
              <Text style={styles.subTitle}>Subscription</Text>
              <Text style={styles.subDetail}>Renews on Apr 3, 2026</Text>
              <TouchableOpacity style={styles.planBadge}>
                <Ionicons name="star" size={12} color="#FFFFFF" />
                <Text style={styles.planText}>Yearly Plan - Active</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {!isKeyboardVisible && (
        <View
          style={[styles.bottomNav, { bottom: Math.max(insets.bottom, 20) }]}
        >
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navActiveIndicatorPill}>
              <HomeIcon active={true} size={24} />
              <Text style={styles.navTextActive}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={role === 'business' ? onShortsPress : onSearchPress}
          >
            {role === 'business' ? (
              <ShortsIcon active={false} size={24} />
            ) : (
              <Feather name="search" size={24} color="#A0AEC0" />
            )}
            <Text style={styles.navText}>{role === 'business' ? 'Shorts' : 'Search'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={role === 'business' ? onDetailsPress : onShortsPress}
          >
            {role === 'business' ? (
              <DetailsIcon active={false} size={24} />
            ) : (
              <ShortsIcon active={false} size={24} />
            )}
            <Text style={styles.navText}>{role === 'business' ? 'Details' : 'Shorts'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
            <ProfileIcon active={false} size={24} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Menu Overlay */}
      {showMenu && (
        <Modal
          transparent={true}
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
          animationType="fade"
        >
          <TouchableOpacity 
            style={styles.menuOverlay} 
            activeOpacity={1} 
            onPress={() => setShowMenu(false)}
          >
            <View style={[styles.menuContent, { top: insets.top + 70 }]}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  onProfilePress();
                }}
              >
                <Feather name="user" size={18} color="#1A1C1E" />
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  onLogout && onLogout();
                }}
              >
                <Feather name="log-out" size={18} color="#FF3B30" />
                <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );

  return role === 'business'
    ? renderBusinessDashboard()
    : renderPatientDashboard();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white background for business
  },
  scrollContent: {
    paddingBottom: 100,
  },
  stickyHeaderContainer: {
    backgroundColor: '#0d1b2a',
    zIndex: 100,
  },
  // Business Header Styles
  businessHeaderContainer: {
    backgroundColor: '#0d1b2a',
    zIndex: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  businessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  businessProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#007AFF', // Vibrant blue for the avatar
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarLetter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  businessWelcomeText: {
    fontSize: 10,
    color: '#A0AEC0',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  locationBadgeContainer: {
    marginTop: 6,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.2)', // Semi-transparent blue
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginRight: 6,
  },
  locationBadgeText: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDotRed: {
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
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContent: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 10,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginHorizontal: 10,
  },
  // Business Scroll Content
  businessScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    backgroundColor: '#F8FAFC', // Slightly off-white for contrast
  },
  // Action Bar Card
  actionBarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  actionBarInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1A1C1E',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  actionItem: {
    alignItems: 'center',
    gap: 6,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4A5568',
  },
  // Performance Overview
  performanceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  viewReportText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  statBox: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: '1.5%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontWeight: '600',
  },
  // Complete Your Profile
  completeProfileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  completeProfileIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completeProfileContent: {
    flex: 1,
  },
  completeProfileTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  completeProfileSubtitle: {
    fontSize: 11,
    color: '#718096',
    marginTop: 2,
    lineHeight: 14,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 6,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // Business Subscription Card
  businessSubscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00D1FF', // Cyan color from image
    borderRadius: 24,
    padding: 20,
    shadowColor: '#00D1FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  subInfo: {
    flex: 1,
  },
  businessSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  businessSubDetail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    marginBottom: 10,
  },
  yearlyPlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  yearlyPlanText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  businessManageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  businessManageText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // Business Bottom Nav
  businessBottomNav: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 76,
    backgroundColor: '#010B13', // Very dark blue/black
    borderRadius: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  navActivePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 60,
    paddingHorizontal: 12,
    borderRadius: 18,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  navActiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navInactiveText: {
    color: '#A0AEC0',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '600',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
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
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    backgroundColor: '#0d1b2a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 0, // Ensure no platform default padding issues
  },
  mainContent: {
    paddingTop: 25,
    // Negative margin to allow horizontal scroll to be edge-to-edge with padding
    paddingHorizontal: 0,
  },
  categoriesScroll: {
    marginBottom: 25,
    marginHorizontal: -5,
  },
  categoryCard: {
    width: 85,
    height: 100,
    backgroundColor: '#E6F4FE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryCardActive: {
    backgroundColor: '#007AFF',
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  categoryTitleActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  clinicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  clinicImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  clinicInfo: {
    flex: 1,
    marginLeft: 12,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  clinicSpecialty: {
    fontSize: 13,
    color: '#6C727A',
    marginTop: 2,
  },
  clinicStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#6C727A',
    fontWeight: '500',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  shortsScroll: {
    marginBottom: 25,
    marginHorizontal: -5,
  },
  shortItem: {
    width: 140,
    marginHorizontal: 5,
  },
  shortThumbnail: {
    width: 140,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#E1E4E8',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  aiText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  playIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shortInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  viewCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  viewCountText: {
    fontSize: 11,
    color: '#1A1C1E',
    fontWeight: '500',
  },
  shortTitle: {
    fontSize: 13,
    color: '#6C727A',
    fontWeight: '500',
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  subLeft: {
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
  },
  subDetail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    marginBottom: 10,
    zIndex: 1,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
    zIndex: 1,
  },
  planText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  manageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1,
  },
  manageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subCircleSmall: {
    position: 'absolute',
    top: -20,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  subCircleLarge: {
    position: 'absolute',
    bottom: -40,
    right: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
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
  horizontalScrollPadding: {
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  navActiveIndicatorPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '80%',
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

export default HomeScreen;
