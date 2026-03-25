import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 3;

const CATEGORIES = [
  { id: '1', title: 'Clinic', icon: 'home-plus', active: true },
  { id: '2', title: 'Find Doctor', icon: 'stethoscope', active: false },
  { id: '3', title: 'Ambulance', icon: 'ambulance', active: false },
  { id: '4', title: 'Pharmachy', icon: 'pill', active: false },
];

const SHORTS_DATA = [
  { id: '1', title: 'Whitening Tips', views: '612', duration: '0:30', image: 'https://images.unsplash.com/photo-1629909613654-28705fe06795?q=80&w=500&auto=format&fit=crop', ai: false },
  { id: '2', title: 'Aligning Teeth', views: '612', duration: '0:60', image: 'https://images.unsplash.com/photo-1606811841660-1b51e9fd01a1?q=80&w=500&auto=format&fit=crop', ai: false },
  { id: '3', title: 'Root Canal FAQ', views: '612', duration: '0:30', image: 'https://images.unsplash.com/photo-1593054910319-383796856070?q=80&w=500&auto=format&fit=crop', ai: true },
  { id: '4', title: 'Braces Guide', views: '612', duration: '0:30', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500&auto=format&fit=crop', ai: true },
  { id: '5', title: 'Cavity Prevention', views: '715', duration: '0:60', image: 'https://images.unsplash.com/photo-1576091160550-2173bdd99625?q=80&w=500&auto=format&fit=crop', ai: false },
  { id: '6', title: 'Kids Dentistry', views: '612', duration: '0:30', image: 'https://images.unsplash.com/photo-1597764650032-155b823dc0c6?q=80&w=500&auto=format&fit=crop', ai: true },
  { id: '7', title: 'Oral Hygiene', views: '820', duration: '0:30', image: 'https://images.unsplash.com/photo-1445527192671-9551e9d4eaec?q=80&w=500&auto=format&fit=crop', ai: false },
  { id: '8', title: 'Scaling Benefits', views: '540', duration: '0:45', image: 'https://images.unsplash.com/photo-1460672314991-c19ca076299c?q=80&w=500&auto=format&fit=crop', ai: false },
  { id: '9', title: 'Crowns Setup', views: '612', duration: '0:30', image: 'https://images.unsplash.com/photo-1592947945242-692300416972?q=80&w=500&auto=format&fit=crop', ai: true },
];

const ShortsScreen = ({ role, onHomePress, onSearchPress, onProfilePress, onShortPress }: { 
  role: string;
  onHomePress: () => void; 
  onSearchPress: () => void; 
  onProfilePress: () => void;
  onShortPress: (short: any) => void;
  onDetailsPress?: () => void;
}) => {
  const insets = useSafeAreaInsets();

  const renderShortItem = ({ item }: { item: typeof SHORTS_DATA[0] }) => (
    <TouchableOpacity style={styles.shortCard} onPress={() => onShortPress(item)}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
        {item.ai && (
          <View style={styles.aiBadge}>
            <MaterialCommunityIcons name="lightning-bolt" size={10} color="#FFFFFF" />
            <Text style={styles.aiText}>AI</Text>
          </View>
        )}
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={20} color="rgba(255,255,255,0.8)" />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.shortInfo}>
        <View style={styles.viewsRow}>
          <Feather name="eye" size={12} color="#1A1C1E" />
          <Text style={styles.viewsText}>{item.views}</Text>
        </View>
        <Text style={styles.shortTitle} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {/* Fixed Header and Filters Section */}
      <View style={styles.fixedHeaderContainer}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>All Shorts</Text>
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

        {/* Categories Section */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, cat.active && styles.categoryCardActive]}
              >
                <View style={[styles.categoryIconContainer, cat.active && styles.categoryIconActive]}>
                  <MaterialCommunityIcons
                    name={cat.icon as any}
                    size={28}
                    color={cat.active ? '#FFFFFF' : '#007AFF'}
                  />
                </View>
                <Text style={[styles.categoryTitle, cat.active && styles.categoryTitleActive]}>
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={20} color="#A0AEC0" />
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              placeholderTextColor="#A0AEC0"
            />
            <TouchableOpacity style={styles.micCircle}>
              <MaterialCommunityIcons name="microphone" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={SHORTS_DATA}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderShortItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
      />

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { bottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
          <Feather name="home" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navActiveIndicatorPill}>
            <MaterialCommunityIcons name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.navTextActive}>Shorts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={role === 'business' ? onDetailsPress : onSearchPress}
        >
          {role === 'business' ? (
            <Feather name="home" size={24} color="#A0AEC0" />
          ) : (
            <Feather name="search" size={24} color="#A0AEC0" />
          )}
          <Text style={styles.navText}>{role === 'business' ? 'Details' : 'Search'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
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
    backgroundColor: '#FFFFFF',
  },
  fixedHeaderContainer: {
    backgroundColor: '#0d1b2a',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  header: {
    backgroundColor: '#0d1b2a',
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
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
  categorySection: {
    paddingVertical: 15,
    backgroundColor: '#F0F7FF',
  },
  categoriesRow: {
    paddingHorizontal: 15,
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
  categoryIconActive: {},
  categoryTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },
  categoryTitleActive: {
    color: '#FFFFFF',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  searchInputWrapper: {
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
  },
  micCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 100,
  },
  shortCard: {
    width: COLUMN_WIDTH,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  thumbnailContainer: {
    width: '100%',
    height: COLUMN_WIDTH * 1.5,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00BCD4',
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    gap: 2,
  },
  aiText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shortInfo: {
    marginTop: 8,
  },
  viewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  shortTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6C727A',
    marginTop: 2,
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

export default ShortsScreen;
