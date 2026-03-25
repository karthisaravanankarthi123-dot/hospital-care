import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions,
  Platform,
  Image,
  Modal,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; // Removed as library is not installed
import Svg, { Circle, Path, Rect, Defs, LinearGradient as SvgLinearGradient, Stop, G, Polygon } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, ShortsIcon, DetailsIcon, ProfileIcon } from './NavigationIcons';

const { width } = Dimensions.get('window');


// General SVGs
const LightningSmall = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
        <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
);

const LightningPill = () => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
        <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
);

const CloudUpload = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M16 16l-4-4-4 4M12 12v9" />
        <Path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        <Path d="M16 16l-4-4-4 4" />
    </Svg>
);

const CloudUploadBlue = () => (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M16 16l-4-4-4 4M12 12v9" />
        <Path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        <Path d="M16 16l-4-4-4 4" />
    </Svg>
);

const CameraRollIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <Circle cx="8.5" cy="8.5" r="1.5" />
        <Path d="M21 15l-5-5L5 21" />
    </Svg>
);

const GoogleGIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </Svg>
);

const LinkOrangeIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <Path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </Svg>
);

const PlayButtonSolid = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
        <Path d="M8 5v14l11-7z" />
    </Svg>
);

const EyeOutline = ({ color = "#8e99af" }) => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Circle cx="12" cy="12" r="3" />
    </Svg>
);

const EyeLargeBlue = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Circle cx="12" cy="12" r="3" />
    </Svg>
);

const ShareOrange = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="18" cy="5" r="3" />
        <Circle cx="6" cy="12" r="3" />
        <Circle cx="18" cy="19" r="3" />
        <Path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </Svg>
);

const IsometricIllustration = () => (
  <Svg width="120" height="120" viewBox="0 0 120 120">
    <G transform="translate(10, 20)">
      {/* Base Plane */}
      <Path d="M50 85 l45 -25 l-45 -25 l-45 25 z" fill="#FFFFFF" />
      <Path d="M50 85 l45 -25 l-45 -25 l-45 25 z" fill="none" stroke="#e0f2fe" strokeWidth="2"/>
      
      {/* Phone Body */}
      <Path d="M35 15 l30 -15 v50 l-30 15 z" fill="#0055ff" />
      <Path d="M33 17 l30 -15 v50 l-30 15 z" fill="#FFFFFF" />
      {/* Phone Screen */}
      <Path d="M36 20 l24 -12 v40 l-24 12 z" fill="#e0f2fe" />
      
      {/* Play Icon */}
      <Polygon points="45,35 55,30 55,42" fill="#007aff" />
      <Path d="M43 25 l2 12 l-8 4 z" fill="#34c759" opacity="0.6" />

      {/* Bubble 1 */}
      <Path d="M20 5 l15 -8 v10 l-15 8 z" fill="#ffcc00" />
      <Path d="M23 7 l3 -1.5 m-1 4 l6 -3 m-2 5 l4 -2" stroke="#FFFFFF" strokeWidth="1" />

      {/* Bubble 2 */}
      <Path d="M75 15 l15 -8 v10 l-15 8 z" fill="#ffcc00" />
      <Path d="M78 17 l3 -1.5 m-1 4 l6 -3 m-2 5 l4 -2" stroke="#FFFFFF" strokeWidth="1" />

      {/* Person Character */}
      <Circle cx="25" cy="40" r="4" fill="#000000" />
      <Path d="M24 45 l5 -15 l4 8" stroke="#000000" strokeWidth="2" fill="none" />
      <Path d="M25 45 l-2 15 m2 -15 l4 10" stroke="#000000" strokeWidth="2" fill="none"/>
      <Path d="M23 42 l6 -3 v10 l-6 3 z" fill="#007aff" />
    </G>
  </Svg>
);

const ShortsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const shortsData = [
    { 
       id: 1, 
       title: 'Braces Guide', 
       views: '612', 
       time: '0:30',
       bg: ['#ff9966', '#ff5e62']
    },
    { 
       id: 2, 
       title: 'Cavity Prevention', 
       views: '715', 
       time: '0:60',
       bg: ['#f2994a', '#f2c94c']
    },
    { 
       id: 3, 
       title: 'Kids Dentistry', 
       views: '612', 
       time: '0:30',
       bg: ['#2193b0', '#6dd5ed']
    }
  ];

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      {/* Header */}
      <View style={[styles.headerArea, { paddingTop: insets.top + 10 }]}>
         <Text style={styles.headerTitle}>Shorts</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
          
          {/* Create A Short Card */}
          <View
            style={[styles.createCard, { backgroundColor: '#0099ff' }]}
          >
            <View style={styles.createCardLeft}>
                <View style={styles.createBadgeRow}>
                   <LightningSmall />
                   <Text style={styles.createBadgeText}>CREATE A SHORT</Text>
                </View>
                <Text style={styles.createTitle}>Reach Customers{'\n'}with short videos</Text>
                <Text style={styles.createSubText}>Upload your own clip or type 100{'\n'}words our AI builds a professional{'\n'}video for you.</Text>
                
                <View style={styles.buttonRow}>
                   <TouchableOpacity style={styles.actionBtnOutline} onPress={() => setIsUploadVisible(true)}>
                      <CloudUpload />
                      <Text style={styles.actionBtnText}>Upload</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                      style={[styles.actionBtnOutline, { marginLeft: 10 }]}
                      onPress={() => navigation.navigate('ShortGenerateScreen')}
                   >
                      <LightningPill />
                      <Text style={styles.actionBtnText}>AI Generate</Text>
                   </TouchableOpacity>
                </View>
            </View>
            <View style={styles.illustrationWrap}>
               <IsometricIllustration />
            </View>
          </View>

          {/* My Shorts Section */}
          <TouchableOpacity 
             style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
             onPress={() => navigation.navigate('AllShortsScreen')}
          >
             <Text style={styles.sectionTitle}>My Shorts</Text>
             <Text style={{ fontSize: 13, color: '#0055ff', fontWeight: 'bold' }}>See All {'>'}</Text>
          </TouchableOpacity>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shortsScroll} contentContainerStyle={{ paddingRight: 20 }}>
             {shortsData.map((short, index) => (
                <View key={index} style={styles.shortCardContainer}>
                 <View 
                    style={[styles.shortThumbnail, { backgroundColor: short.bg[0] }]} 
                 >
                      {/* AI Badge */}
                      <View style={styles.aiBadgeBox}>
                         <LightningSmall />
                         <Text style={styles.aiBadgeText}>AI</Text>
                      </View>
                      
                      {/* Play Button */}
                      <View style={styles.playCenterRound}>
                         <View style={{ marginLeft: 3 }}>
                           <PlayButtonSolid />
                         </View>
                      </View>

                      {/* Duration Badge */}
                      <View style={styles.durationBox}>
                         <Text style={styles.durationText}>{short.time}</Text>
                      </View>
                   </View>
                   <View style={styles.shortFooter}>
                      <View style={styles.shortFooterTopRow}>
                          <EyeOutline color="#8e99af" />
                          <Text style={styles.shortFooterViews}>{short.views}</Text>
                      </View>
                      <Text style={styles.shortFooterTitle} numberOfLines={1}>{short.title}</Text>
                   </View>
                </View>
             ))}
          </ScrollView>

          {/* All Performance Section */}
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>All Performance</Text>
          </View>
          
          <View style={styles.performanceCard}>
             <View style={styles.perfItem}>
                <View style={[styles.perfIconBase, { backgroundColor: '#e6f0fa' }]}>
                   <EyeLargeBlue />
                </View>
                <View style={styles.perfInfo}>
                   <Text style={styles.perfTextMain}>Profile Views</Text>
                   <Text style={styles.perfTextSub}>Patients visited your page</Text>
                </View>
                <View style={styles.perfStats}>
                   <Text style={styles.perfStatVal}>1,284</Text>
                   <Text style={[styles.perfStatTrend, { color: '#007aff' }]}>↑ 24%</Text>
                </View>
             </View>
             
             <View style={styles.perfDivider} />

             <View style={styles.perfItem}>
                <View style={[styles.perfIconBase, { backgroundColor: '#fff5e6' }]}>
                   <ShareOrange />
                </View>
                <View style={styles.perfInfo}>
                   <Text style={styles.perfTextMain}>Short Shares</Text>
                   <Text style={styles.perfTextSub}>Patients shared your videos</Text>
                </View>
                <View style={styles.perfStats}>
                   <Text style={styles.perfStatVal}>213</Text>
                   <Text style={[styles.perfStatTrend, { color: '#ff9500' }]}>↑ 12%</Text>
                </View>
             </View>
          </View>

      </ScrollView>

      {/* Upload Video Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUploadVisible}
        onRequestClose={() => setIsUploadVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsUploadVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Upload Video</Text>

                {/* Dropzone Area */}
                <View style={styles.dropzoneContainer}>
                   <View style={styles.dropzoneIconWrapper}>
                      <CloudUploadBlue />
                   </View>
                   <Text style={styles.dropzoneTitle}>Drop your video here</Text>
                   <Text style={styles.dropzoneSubtitle}>
                      MP4, MOV, AVI up to 2GB{'\n'}or <Text style={styles.browseLink}>browse files</Text>
                   </Text>
                </View>

                {/* Options Header */}
                <Text style={styles.optionsLabel}>OR CHOOSE FROM</Text>

                {/* Option Items */}
                <View style={styles.optionsList}>
                  <TouchableOpacity style={styles.optionItem}>
                    <View style={[styles.optionIconBox, { backgroundColor: '#f0f7ff' }]}>
                       <CameraRollIcon />
                    </View>
                    <View style={styles.optionTextCol}>
                       <Text style={styles.optionTitle}>Camera Roll</Text>
                       <Text style={styles.optionSubText}>Import from your library</Text>
                    </View>
                    <Text style={styles.optionArrow}>›</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem}>
                    <View style={[styles.optionIconBox, { backgroundColor: '#f0f7ff' }]}>
                       <GoogleGIcon />
                    </View>
                    <View style={styles.optionTextCol}>
                       <Text style={styles.optionTitle}>Google Drive</Text>
                       <Text style={styles.optionSubText}>Import from your Drive files</Text>
                    </View>
                    <Text style={styles.optionArrow}>›</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem}>
                    <View style={[styles.optionIconBox, { backgroundColor: '#fffbeb' }]}>
                       <LinkOrangeIcon />
                    </View>
                    <View style={styles.optionTextCol}>
                       <Text style={styles.optionTitle}>Paste URL</Text>
                       <Text style={styles.optionSubText}>YouTube, Vimeo, or direct link</Text>
                    </View>
                    <Text style={styles.optionArrow}>›</Text>
                  </TouchableOpacity>
                </View>

                {/* Footer Button */}
                <TouchableOpacity style={styles.modalUploadBtn} onPress={() => setIsUploadVisible(false)}>
                   <Text style={styles.modalUploadBtnText}>Upload Video</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Nav */}
      <View style={[styles.bottomNavContainer, { bottom: Math.max(insets.bottom, 20) }]}>
         <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
              <View style={styles.navItemWrapper}>
                 <HomeIcon active={false} />
                 <Text style={styles.navText}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
               <View style={styles.navItemActiveBg}>
                 <ShortsIcon active={true} />
                 <Text style={styles.navTextActive}>Shorts</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DetailsScreen')}>
              <View style={styles.navItemWrapper}>
                 <DetailsIcon active={false} />
                 <Text style={styles.navText}>Details</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
              <View style={styles.navItemWrapper}>
                 <ProfileIcon active={false} />
                 <Text style={styles.navText}>Profile</Text>
              </View>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerArea: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 15,
    marginBottom: -15, // Let content overlap slightly if needed or blend smooth
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 35, // accounts for the header overlap
  },
  createCard: {
    width: '100%',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  createCardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  createBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  createBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 6,
  },
  createTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 8,
  },
  createSubText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  actionBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  illustrationWrap: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -10,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  shortsScroll: {
    marginBottom: 30,
  },
  shortCardContainer: {
    width: 130,
    borderRadius: 20,
    backgroundColor: '#1b1b1b', // matching footer bg
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shortThumbnail: {
    width: '100%',
    height: 140,
    justifyContent: 'space-between',
    padding: 10,
  },
  aiBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#00d4ff',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  playCenterRound: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBox: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shortFooter: {
    padding: 12,
    backgroundColor: '#1b1b1b',
  },
  shortFooterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shortFooterViews: {
    color: '#FFFFFF',
    fontSize: 11,
    marginLeft: 6,
    fontWeight: '600',
  },
  shortFooterTitle: {
    color: '#8e99af',
    fontSize: 10,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  perfItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perfIconBase: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfInfo: {
    flex: 1,
    marginLeft: 15,
  },
  perfTextMain: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  perfTextSub: {
    fontSize: 12,
    color: '#8e99af',
  },
  perfStats: {
    alignItems: 'flex-end',
  },
  perfStatVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  perfStatTrend: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  perfDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 15,
  },
  bottomSpacer: {
    height: 120,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40,
    height: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
  dropzoneContainer: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 35,
    marginBottom: 25,
  },
  dropzoneIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropzoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 5,
  },
  dropzoneSubtitle: {
    fontSize: 13,
    color: '#8e99af',
    textAlign: 'center',
    lineHeight: 18,
  },
  browseLink: {
    color: '#0055ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionsLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8e99af',
    letterSpacing: 1.2,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  optionsList: {
    width: '100%',
    marginBottom: 30,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextCol: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  optionSubText: {
    fontSize: 12,
    color: '#8e99af',
    marginTop: 2,
  },
  optionArrow: {
    fontSize: 22,
    color: '#cbd5e1',
  },
  modalUploadBtn: {
    width: '100%',
    backgroundColor: '#0055ff',
    borderRadius: 12,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalUploadBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 35,
    height: 70,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  navItemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActiveBg: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: 'column',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  navText: {
    color: '#8e99af',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});

export default ShortsScreen;
