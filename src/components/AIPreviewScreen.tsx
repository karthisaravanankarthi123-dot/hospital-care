import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  Image,
  SafeAreaView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const AIPreviewScreen = ({ 
  onBack, 
  onEdit, 
  onSettings,
  videoData = {
    title: "Braces Guide – What to Expect",
    style: "Professional",
    duration: "30 seconds",
    voice: "AI Voice"
  }
}: { 
  onBack: () => void; 
  onEdit: () => void; 
  onSettings: () => void;
  videoData?: any;
}) => {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#334155" />
        </TouchableOpacity>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Preview Video</Text>
          <Text style={styles.headerSubtitle}>Review before publishing</Text>
        </View>
      </View>

      {/* Video Content Area */}
      <View style={styles.videoArea}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1629909613654-28705fe06795?q=80&w=1000' }} 
          style={styles.videoPlaceholder}
          resizeMode="cover"
        />
        
        {/* AI Badge */}
        <View style={styles.aiBadge}>
          <MaterialCommunityIcons name="lightning-bolt" size={14} color="#FFFFFF" />
          <Text style={styles.aiBadgeText}>AI Generated</Text>
        </View>

        {/* Video Info Overlay */}
        <View style={styles.videoOverlay}>
          <Text style={styles.videoTitle}>{videoData.title}</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '0%' }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>0:00</Text>
              <Text style={styles.timeText}>0:30</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialCommunityIcons name="skip-backward" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialCommunityIcons name="undo" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.playBtn}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Icon name={isPlaying ? "pause" : "play"} size={32} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialCommunityIcons name="pause" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialCommunityIcons name="fullscreen" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Details Bottom Sheet */}
      <View style={[styles.detailsContainer, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.handle} />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Style</Text>
          <View style={styles.styleBadge}>
            <Text style={styles.styleText}>{videoData.style}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{videoData.duration}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Voice</Text>
          <Text style={styles.detailValue}>{videoData.voice}</Text>
        </View>

        <View style={styles.divider} />

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Feather name="edit-3" size={20} color="#1A1C1E" />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn} onPress={onSettings}>
            <Text style={styles.settingsBtnText}>Go To Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleCol: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  videoArea: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  aiBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0061FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 25,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  controlBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0061FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0061FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
  styleBadge: {
    backgroundColor: '#E1EFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  styleText: {
    color: '#0061FF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 5,
  },
  editBtn: {
    flex: 1,
    height: 56,
    backgroundColor: '#F1F5F9',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  editBtnText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsBtn: {
    flex: 2,
    height: 56,
    backgroundColor: '#0061FF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0061FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  settingsBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIPreviewScreen;
