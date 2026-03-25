import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const VideoPlayerScreen = ({ short, onBack }: { short: any; onBack: () => void }) => {
  const insets = useSafeAreaInsets();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      
      {/* Background Video Mock (Image for now) */}
      <Image 
        source={{ uri: short?.image || 'https://images.unsplash.com/photo-1629909613654-28705fe06795?q=80&w=1000' }} 
        style={styles.backgroundVideo}
      />
      <View style={styles.overlay} />

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationSelector}>
            <Ionicons name="location" size={18} color="#FFFFFF" />
            <Text style={styles.locationText}>New York</Text>
            <Feather name="chevron-down" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="rgba(255,255,255,0.7)" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.7)"
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name="microphone" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Center Play Button Overlay */}
      <TouchableOpacity 
        style={styles.centerContainer} 
        onPress={() => setIsPlaying(!isPlaying)}
        activeOpacity={1}
      >
        {!isPlaying && (
          <View style={styles.playButtonCircle}>
            <Ionicons name="play" size={40} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>

      {/* Right Interaction Sidebar */}
      <View style={styles.interactionsSidebar}>
        <TouchableOpacity style={styles.interactionItem} onPress={() => setIsLiked(!isLiked)}>
          <View style={styles.iconCircle}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? "#FF3B30" : "#FFFFFF"} />
          </View>
          <Text style={styles.interactionText}>{short?.views || '12.4K'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionItem} onPress={() => setIsSaved(!isSaved)}>
          <View style={styles.iconCircle}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.interactionText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="share-variant" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.interactionText}>SHARE</Text>
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ef159963?q=80&w=200' }} 
            style={styles.avatar} 
          />
        </View>
      </View>

      {/* Bottom Content Section */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.viewDetailsBtn}>
          <Text style={styles.viewDetailsTxt}>View More Details</Text>
        </TouchableOpacity>

        <View style={styles.clinicInfoRow}>
          <View style={styles.clinicLogoContainer}>
            <MaterialCommunityIcons name="heart-flash" size={24} color="#007AFF" />
          </View>
          <View style={styles.clinicMeta}>
            <Text style={styles.clinicName}>Smile Care Clinic</Text>
            <Text style={styles.clinicSubtext}>Dental • 2m ago</Text>
          </View>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followBtnText}>FOLLOW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            Understanding the early signs of hypertensio... <Text style={styles.seeMore}>See More</Text>
          </Text>
        </View>

        {/* Custom Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '40%' }]} />
          </View>
          <Text style={styles.progressTime}>0:45 / 2:15</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchBarContainer: {
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  centerContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  interactionsSidebar: {
    position: 'absolute',
    right: 15,
    bottom: 220,
    alignItems: 'center',
    gap: 20,
  },
  interactionItem: {
    alignItems: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  interactionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginTop: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 15,
  },
  viewDetailsBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewDetailsTxt: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  clinicInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clinicLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicMeta: {
    flex: 1,
  },
  clinicName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clinicSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  followBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionSection: {
    marginBottom: 5,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  seeMore: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VideoPlayerScreen;
