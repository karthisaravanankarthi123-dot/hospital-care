import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  BackHandler,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

const SearchScreen = ({
  role,
  onHomePress,
  onClinicPress,
  onShortsPress,
  onProfilePress,
  onDetailsPress,
}: {
  role: string;
  onHomePress: () => void;
  onClinicPress: (clinic: any) => void;
  onShortsPress: () => void;
  onProfilePress: () => void;
  onDetailsPress?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCategoryId, setSelectedCategoryId] = useState('1');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={[styles.stickyHeaderContainer, { paddingTop: insets.top }]}>
        <View style={styles.darkHeader}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerLabel}>SEARCH</Text>
              <Text style={styles.headerTitle}>Find Nearby You</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton}>
                <View style={styles.notificationDot} />
                <Feather name="bell" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="menu" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories Section (Light Background) */}
        <View style={styles.categorySection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategoryId === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategoryId(cat.id)}
                  style={[
                    styles.categoryCard,
                    isActive && styles.categoryCardActive,
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIconContainer,
                      isActive && styles.categoryIconActive,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color={isActive ? '#FFFFFF' : '#007AFF'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryTitle,
                      isActive && styles.categoryTitleActive,
                    ]}
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Search Inputs (Sticky) */}
        <View style={styles.searchInputsSticky}>
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrapper}>
              <Feather name="search" size={20} color="#A0AEC0" />
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor="#A0AEC0"
              />
              <TouchableOpacity style={styles.micCircle}>
                <MaterialCommunityIcons
                  name="microphone"
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.gpsButtonCircle}>
              <MaterialCommunityIcons name="target" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchMeta}>
            <TouchableOpacity style={styles.locationBadge}>
              <FontAwesome5 name="paper-plane" size={12} color="#007AFF" />
              <Text style={styles.locationText}>New York</Text>
            </TouchableOpacity>
            <Text style={styles.resultsText}>Results within 5km</Text>
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
      >
        <View style={styles.searchBackground}>
          {/* Map View */}
          <View style={styles.mapContainer}>
            {/* Placeholder for map background with light colors */}
            <View style={styles.mapMock}>
              <View style={styles.mapLineH} />
              <View style={[styles.mapLineH, { top: '40%' }]} />
              <View style={[styles.mapLineH, { top: '70%' }]} />
              <View style={styles.mapLineV} />
              <View style={[styles.mapLineV, { left: '30%' }]} />
              <View style={[styles.mapLineV, { left: '60%' }]} />

              <View
                style={[
                  styles.mapPark,
                  { top: '10%', left: '10%', width: '20%', height: '15%' },
                ]}
              />
              <View
                style={[
                  styles.mapPark,
                  { top: '50%', left: '70%', width: '25%', height: '20%' },
                ]}
              />

              {/* Location Pins */}
              <View style={[styles.pinWrapper, { top: '40%', left: '35%' }]}>
                <View style={styles.pinBody}>
                  <Text style={styles.pinText}>1</Text>
                </View>
                <View style={styles.pinTail} />
              </View>

              <View style={[styles.pinWrapper, { top: '35%', left: '55%' }]}>
                <View style={[styles.pinBody, { backgroundColor: '#007AFF' }]}>
                  <Text style={styles.pinText}>2</Text>
                </View>
                <View style={styles.pinTail} />
              </View>

              <View style={[styles.pinWrapper, { top: '55%', left: '20%' }]}>
                <View style={styles.pinBody}>
                  <Text style={styles.pinText}>3</Text>
                </View>
                <View style={styles.pinTail} />
              </View>

              <View style={[styles.pinWrapper, { top: '65%', left: '85%' }]}>
                <View style={styles.pinBody}>
                  <Text style={styles.pinText}>4</Text>
                </View>
                <View style={styles.pinTail} />
              </View>

              {/* Current Location Blue Pulse */}
              <View
                style={[styles.currentLocation, { top: '50%', left: '50%' }]}
              >
                <View style={styles.pulseRing} />
                <View style={styles.pulseDot} />
              </View>
            </View>
          </View>

          {/* Results List */}
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              Nearby Clinics <Text style={styles.foundText}>(4 found)</Text>
            </Text>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={18} color="#007AFF" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.clinicsList}>
            {CLINICS.map((clinic) => (
              <TouchableOpacity
                key={clinic.id}
                style={styles.clinicCardSmall}
                onPress={() => onClinicPress(clinic)}
                activeOpacity={0.7}
              >
                <View style={styles.clinicImageSub}>
                  <MaterialCommunityIcons
                    name="heart-flash"
                    size={32}
                    color="#007AFF"
                  />
                </View>
                <View style={styles.clinicInfoSub}>
                  <Text style={styles.clinicNameSub}>{clinic.name}</Text>
                  <Text style={styles.clinicSpecialtySub}>
                    {clinic.specialty}
                  </Text>
                  <View style={styles.clinicStatusRowSub}>
                    <Text style={styles.distanceTextSub}>{clinic.distance}</Text>
                    <View
                      style={[
                        styles.statusDotSub,
                        { backgroundColor: clinic.color },
                      ]}
                    />
                    <Text style={[styles.statusTextSub, { color: clinic.color }]}>
                      {clinic.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.viewDetailsBtn}>
                  <Text style={styles.viewDetailsTxt}>View Details</Text>
                  <Feather name="arrow-right" size={12} color="#007AFF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {!isKeyboardVisible && (
        <View
          style={[styles.bottomNav, { bottom: Math.max(insets.bottom, 20) }]}
        >
          <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
            <HomeIcon active={false} size={24} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          
          {role === 'business' ? (
            <>
              <TouchableOpacity style={styles.navItem} onPress={onShortsPress}>
                <ShortsIcon active={false} size={24} />
                <Text style={styles.navText}>Shorts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={onDetailsPress}>
                <DetailsIcon active={false} size={24} />
                <Text style={styles.navText}>Details</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.navItem}>
                <View style={styles.navActiveIndicatorPill}>
                  <Feather name="search" size={24} color="#FFFFFF" />
                  <Text style={styles.navTextActive}>Search</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={onShortsPress}>
                <ShortsIcon active={false} size={24} />
                <Text style={styles.navText}>Shorts</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
            <ProfileIcon active={false} size={24} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  stickyHeaderContainer: {
    backgroundColor: '#0d1b2a',
    zIndex: 100,
  },
  searchInputsSticky: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6F4FE',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  darkHeader: {
    backgroundColor: '#0d1b2a',
    paddingBottom: 20,
    zIndex: 100,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLabel: {
    fontSize: 10,
    color: '#A0AEC0',
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
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
  categorySection: {
    backgroundColor: '#F0F7FF',
    paddingVertical: 15,
  },
  categoriesRow: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryCard: {
    width: (width - 60) / 4,
    height: 95,
    backgroundColor: '#E6F4FE',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
  },
  categoryCardActive: {
    backgroundColor: '#007AFF',
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconActive: {
    // Active style if needed
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },
  categoryTitleActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    // Dynamic padding set in component
  },
  searchBackground: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 52,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1A1C1E',
    paddingVertical: 0,
  },
  micCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6F4FE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 5,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  resultsText: {
    fontSize: 13,
    color: '#6C727A',
    fontWeight: '500',
  },
  mapContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  mapLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E9F2FF',
  },
  mapLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E9F2FF',
  },
  mapPark: {
    position: 'absolute',
    backgroundColor: '#D6E9C6',
    borderRadius: 8,
    opacity: 0.5,
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBody: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pinText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pinTail: {
    width: 6,
    height: 6,
    backgroundColor: '#007AFF',
    transform: [{ rotate: '45deg' }],
    marginTop: -3,
  },
  currentLocation: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  pulseRing: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  foundText: {
    fontSize: 14,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0E6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  clinicsList: {
    gap: 15,
  },
  clinicCardSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  clinicImageSub: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicInfoSub: {
    flex: 1,
    marginLeft: 12,
  },
  clinicNameSub: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  clinicSpecialtySub: {
    fontSize: 12,
    color: '#6C727A',
    marginTop: 2,
  },
  clinicStatusRowSub: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  distanceTextSub: {
    fontSize: 11,
    color: '#6C727A',
    fontWeight: '500',
  },
  statusDotSub: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 6,
  },
  statusTextSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsTxt: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
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

export default SearchScreen;
