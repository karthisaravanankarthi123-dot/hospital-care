import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  StatusBar,
  FlatList,
  Platform,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient'; // Removed as library is not installed
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
// Calculate width to allow 3 columns with 15px gap on sides, 10px between
const CARD_MARGIN = 12;
const SIDE_PADDING = 20;
const cardWidth = (width - (SIDE_PADDING * 2) - (CARD_MARGIN * 2)) / 3;

// ----------------- SVG Icons -----------------

const LeftArrowIcon = () => <Icon name="arrow-back" size={20} color="#0f172a" />;

const LightningSmall = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);

const PlayButtonSolid = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF">
      <Path d="M8 5v14l11-7z" />
  </Svg>
);

const EyeOutline = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeSlashOutline = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <Path d="M1 1l22 22" />
  </Svg>
);

const AllShortsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'AI Generated', 'Uploaded', 'Published'];

  const shortsData = [
    { id: '1', title: 'Whitening Tips', duration: '0:30', views: 'Un Published', isAi: false, bg: ['#c4e0e5', '#4ca1af'] },
    { id: '2', title: 'Aligning Teeth', duration: '0:60', views: 'Un Published', isAi: false, bg: ['#e6dada', '#274046'] },
    { id: '3', title: 'Root Canal FAQ', duration: '0:30', views: '612', isAi: true, bg: ['#434343', '#000000'] },
    { id: '4', title: 'Braces Guide', duration: '0:30', views: '612', isAi: true, bg: ['#ff9966', '#ff5e62'] },
    { id: '5', title: 'Cavity Prevention', duration: '0:60', views: '715', isAi: true, bg: ['#f2994a', '#f2c94c'] },
    { id: '6', title: 'Kids Dentistry', duration: '0:30', views: '612', isAi: false, bg: ['#e2e2e2', '#999999'] },
    { id: '7', title: 'Retainer Options', duration: '0:45', views: '820', isAi: false, bg: ['#141e30', '#243b55'] },
    { id: '8', title: 'Aligning Teeth', duration: '0:60', views: '715', isAi: false, bg: ['#ed4264', '#ffedbc'] },
    { id: '9', title: 'Braces Guide', duration: '0:30', views: '612', isAi: true, bg: ['#870000', '#190a05'] },
    { id: '10', title: 'Dental Hygiene', duration: '0:30', views: '412', isAi: false, bg: ['#56ccf2', '#2f80ed'] },
    { id: '11', title: 'Smile Design', duration: '0:30', views: '920', isAi: true, bg: ['#f2c94c', '#f2994a'] },
    { id: '12', title: 'Oral Care 101', duration: '0:30', views: '1.2k', isAi: false, bg: ['#a8c0ff', '#3f2b96'] }
  ];

  const renderShortItem = ({ item }: { item: typeof shortsData[0] }) => {
    const isUnpublished = item.views === 'Un Published';

    return (
      <View style={styles.shortCard}>
        <View 
          style={[styles.thumbnailContainer, { backgroundColor: item.bg[0] }]} 
        >
          {item.isAi && (
            <View style={styles.aiBadgeTop}>
                <LightningSmall />
                <Text style={styles.aiBadgeTextSmall}>AI</Text>
            </View>
          )}
          
          <View style={styles.playCenterRound}>
              <View style={{ marginLeft: 3 }}>
                <PlayButtonSolid />
              </View>
          </View>
          
          <View style={styles.durationBadge}>
              <Text style={styles.durationTextSmall}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.shortInfo}>
            <View style={styles.viewsRowSmall}>
              {isUnpublished ? <EyeSlashOutline /> : <EyeOutline />}
              <Text style={styles.viewsTextTiny}>{item.views}</Text>
            </View>
            <Text style={styles.shortTitleTiny} numberOfLines={1}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header Container (White Background) */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
               <LeftArrowIcon />
            </TouchableOpacity>
            <View style={styles.headerTitleCol}>
              <Text style={styles.headerTitle}>All Shorts</Text>
              <Text style={styles.headerSubtitle}>12 videos • 3 AI-generated</Text>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity 
                    key={tab} 
                    style={[styles.tab, isActive && styles.tabActive]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
      </View>

      {/* Grid Content Background */}
      <View style={styles.gridBackground}>
        <FlatList
          data={shortsData}
          renderItem={renderShortItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Header area starts white
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerTitleCol: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
    fontWeight: '500',
  },
  tabsWrapper: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tabsScroll: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0', // Inactive border
  },
  tabActive: {
    backgroundColor: '#0055ff', // Active bright blue
    borderColor: '#0055ff',
  },
  tabText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155', // Inactive text
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  gridBackground: {
    flex: 1,
    backgroundColor: '#eff5fb', // Light bluish background from screenshot for content
  },
  gridContainer: {
    paddingHorizontal: SIDE_PADDING,
    paddingVertical: 20,
    paddingBottom: 50,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  shortCard: {
    width: cardWidth,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1b1b1b', // Footer dark background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    height: cardWidth * 1.5,
    justifyContent: 'space-between',
    padding: 8,
  },
  aiBadgeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#00d4ff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
  },
  aiBadgeTextSmall: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  playCenterRound: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationTextSmall: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shortInfo: {
    padding: 10,
    backgroundColor: '#131b26', // Extremely dark blue/black for footer
  },
  viewsRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  viewsTextTiny: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  shortTitleTiny: {
    color: '#8e99af',
    fontSize: 10,
  },
});

export default AllShortsScreen;
