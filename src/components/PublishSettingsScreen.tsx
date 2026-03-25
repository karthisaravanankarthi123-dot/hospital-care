import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
  Image,
  Dimensions,
  StatusBar,
  TextInput
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const PublishSettingsScreen = ({ 
  onBack, 
  onPublish,
  videoData = {
    title: "Braces Guide – What to Expect",
    duration: "0:30",
    caption: "Introducing our new analytics dashboard built for speed, designed for clarity. Real-time insights, zero setup needed.",
    hashtags: "#DentalTips #BracesGuide"
  }
}: { 
  onBack: () => void; 
  onPublish: () => void;
  videoData?: any;
}) => {
  const insets = useSafeAreaInsets();
  const [autoShare, setAutoShare] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#334155" />
        </TouchableOpacity>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Publish Settings</Text>
          <Text style={styles.headerSubtitle}>Configure & go live</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
      >
        {/* Thumbnail Preview */}
        <View style={styles.thumbnailContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1629909613654-28705fe06795?q=80&w=1000' }} 
            style={styles.thumbnail}
          />
          <View style={styles.thumbnailOverlay}>
            <View style={styles.playIconBox}>
                <Icon name="play" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.videoTitleInThumb}>{videoData.title}</Text>
            <Text style={styles.videoDuration}>{videoData.duration}</Text>
          </View>
        </View>

        {/* Caption Section */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Caption</Text>
          <Text style={styles.captionText}>{videoData.caption}</Text>
          <Text style={styles.hashtagText}>{videoData.hashtags}</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={[styles.settingIconBox, { backgroundColor: '#E1EFFF' }]}>
              <Feather name="download" size={20} color="#0061FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto-share to profile</Text>
              <Text style={styles.settingSubtitle}>Post to your public profile</Text>
            </View>
            <Switch 
              value={autoShare} 
              onValueChange={setAutoShare}
              trackColor={{ false: "#E2E8F0", true: "#0061FF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={[styles.settingIconBox, { backgroundColor: '#E0FBEF' }]}>
              <Feather name="check-circle" size={20} color="#00C853" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Allow comments</Text>
              <Text style={styles.settingSubtitle}>Patients can leave feedback</Text>
            </View>
            <Switch 
              value={allowComments} 
              onValueChange={setAllowComments}
              trackColor={{ false: "#E2E8F0", true: "#0061FF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={[styles.settingIconBox, { backgroundColor: '#FFF7E6' }]}>
              <Feather name="eye" size={20} color="#FFA000" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Analytics tracking</Text>
              <Text style={styles.settingSubtitle}>Views, shares & engagement</Text>
            </View>
            <Switch 
              value={analytics} 
              onValueChange={setAnalytics}
              trackColor={{ false: "#E2E8F0", true: "#0061FF" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.publishBtn} onPress={onPublish}>
          <Text style={styles.publishBtnText}>Publish Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  scrollContent: {
    padding: 20,
  },
  thumbnailContainer: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  playIconBox: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  videoTitleInThumb: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EBF4FF',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 15,
  },
  captionText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  hashtagText: {
    fontSize: 13,
    color: '#0061FF',
    fontWeight: '600',
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  settingSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 15,
  },
  publishBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#0061FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0061FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PublishSettingsScreen;
