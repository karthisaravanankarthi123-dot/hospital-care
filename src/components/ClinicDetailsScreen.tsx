import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Clinic {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  status: string;
  color: string;
  image?: string;
  bio?: string;
  phone?: string;
  address?: string;
  website?: string;
}

const ClinicDetailsScreen = ({
  clinic,
  role = 'guest',
  onBack,
  onJoinMembership,
}: {
  clinic: Clinic;
  role?: string;
  onBack: () => void;
  onJoinMembership: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [expansionStage, setExpansionStage] = useState(0); // 0: hidden, 1: hours, 2: hours+map
  const scrollRef = useRef<ScrollView>(null);

  const WORKING_HOURS = [
    { day: 'Sunday', hours: 'Closed', status: 'closed' },
    { day: 'Monday', hours: '8:00 AM - 6:00 PM', status: 'open' },
    { day: 'Tuesday', hours: '8:00 AM - 6:00 PM', status: 'open' },
    { day: 'Wednesday', hours: '8:00 AM - 6:00 PM', status: 'today' },
    { day: 'Thursday', hours: '8:00 AM - 6:00 PM', status: 'open' },
    { day: 'Friday', hours: '8:00 AM - 6:00 PM', status: 'open' },
    { day: 'Saturday', hours: '8:00 AM - 6:00 PM', status: 'open' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        ref={scrollRef}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        style={{ flex: 1 }}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: clinic.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop' }} 
            style={[styles.heroImage, role === 'guest' && styles.blurredImage]}
          />
          {role === 'guest' && (
            <View style={styles.lockOverlay}>
              <Feather name="lock" size={60} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.clinicName}>{clinic.name}{role === 'guest' ? ' (Locked)' : ''}</Text>
              <Text style={styles.clinicSpecialty}>{clinic.specialty}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: clinic.status === 'Open' ? '#E8F5E9' : '#FFEBEE' }]}>
              <Text style={[styles.statusText, { color: clinic.color }]}>{clinic.status.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.distanceRow}>
            <Ionicons name="location-outline" size={16} color="#6C727A" />
            <Text style={styles.distanceText}>{clinic.distance} away • New York, NY</Text>
          </View>
        </View>

        {/* Restricted content for guests */}
        {role === 'guest' ? (
          <View style={styles.restrictedContainer}>
            <View style={styles.unlockCard}>
              <View style={styles.unlockIconCircle}>
                <Feather name="award" size={32} color="#007AFF" />
              </View>
              <Text style={styles.unlockTitle}>Unlock Premium Access</Text>
              <Text style={styles.unlockSubtitle}>
                Join our community to view doctor profiles, available time slots
              </Text>
              <TouchableOpacity style={styles.joinMembershipBtn} onPress={onJoinMembership}>
                <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.joinMembershipTxt}>Join Membership</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* Clinic Bio */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clinic Bio</Text>
              <Text style={styles.bioText}>
                {clinic.bio || `${clinic.name} provides modern dental treatments and advanced oral care services. Our experienced team focuses on healthy, confident smiles for every patient.`}
              </Text>
            </View>

            {/* Contact Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Details</Text>
              
              <View style={styles.contactItem}>
                <View style={styles.contactIconContainer}>
                  <Feather name="phone" size={20} color="#007AFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>PHONE NUMBER</Text>
                  <Text style={styles.contactValue}>{clinic.phone || '+1 (212) 555-0198'}</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name="location-outline" size={20} color="#007AFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>ADDRESS</Text>
                  <Text style={styles.contactValue}>{clinic.address || '123 Main St, New York, NY 10001'}</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.contactIconContainer}>
                  <Feather name="globe" size={20} color="#007AFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>WEBSITE</Text>
                  <Text style={styles.contactValue}>{clinic.website || 'www.example.com'}</Text>
                </View>
              </View>
            </View>

            {/* Working Hours (Toggleable) */}
            {expansionStage >= 1 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Working Hours</Text>
                {WORKING_HOURS.map((item, index) => (
                  <View key={index} style={styles.workingHourItem}>
                    <View style={styles.dayRow}>
                      <Text style={styles.dayText}>{item.day}</Text>
                      {item.status === 'today' && (
                        <View style={styles.todayBadge}>
                          <Text style={styles.todayBadgeText}>Today</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[
                      styles.hoursText,
                      item.status === 'closed' && styles.hoursClosed,
                      item.status === 'open' && styles.hoursOpen,
                      item.status === 'today' && styles.hoursToday
                    ]}>
                      {item.hours}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        {/* Map Direction (Toggleable) - Disabled for guests */}
        {role !== 'guest' && expansionStage >= 2 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Map Direction</Text>
            
            {/* Map Mock */}
            <View style={styles.mapContainerSub}>
              <View style={styles.mapLineHSub} />
              <View style={[styles.mapLineHSub, { top: '40%' }]} />
              <View style={styles.mapLineVSub} />
              <View style={[styles.mapLineVSub, { left: '30%' }]} />
              
              <View style={[styles.mapPinSmall, { top: '30%', left: '70%' }]}>
                <Ionicons name="location" size={14} color="#007AFF" />
              </View>
              <View style={[styles.mapUserDot, { top: '60%', left: '40%' }]} />
              
              {/* Route Line Mock */}
              <View style={styles.routeLine} />
            </View>

            {/* Address Row */}
            <View style={styles.mapAddressRow}>
              <View style={styles.mapIconCircle}>
                <Ionicons name="location" size={20} color="#007AFF" />
              </View>
              <View>
                <Text style={styles.mapAddressName}>{clinic.address || '111 Broadway Suite 1304'}</Text>
                <Text style={styles.mapAddressFull}>Financial District, New York, NY 10006</Text>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.mapStatsRow}>
              <View style={styles.mapStatBox}>
                <Text style={styles.mapStatValue}>1.2 km</Text>
                <Text style={styles.mapStatLabel}>Distance</Text>
              </View>
              <View style={styles.mapStatBox}>
                <Text style={styles.mapStatValue}>8 min</Text>
                <Text style={styles.mapStatLabel}>Walking</Text>
              </View>
              <View style={styles.mapStatBox}>
                <Text style={styles.mapStatValue}>2 min</Text>
                <Text style={styles.mapStatLabel}>Driving</Text>
              </View>
            </View>

            {/* Get Directions Button */}
            <TouchableOpacity style={styles.getDirectionsBtn}>
              <Feather name="navigation" size={20} color="#FFFFFF" />
              <Text style={styles.getDirectionsTxt}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Toggle Button - Modified for guests */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: insets.bottom + 20 }, role === 'guest' && { opacity: 0 }]} 
        onPress={() => {
          if (role === 'guest') return;
          let nextStage = expansionStage + 1;
          if (nextStage > 2) nextStage = 0; // Reset to hidden
          setExpansionStage(nextStage);
          
          if (nextStage > 0) {
            // Give it a small timeout to let the layout update
            setTimeout(() => {
              scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }
        }}
        activeOpacity={0.8}
        disabled={role === 'guest'}
      >
        <Feather 
          name={expansionStage === 2 ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#007AFF" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    backgroundColor: '#0d1b2a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#E1E4E8',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clinicName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  clinicSpecialty: {
    fontSize: 16,
    color: '#6C727A',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  distanceText: {
    fontSize: 14,
    color: '#6C727A',
  },
  section: {
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    color: '#6C727A',
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F8FBFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#A0AEC0',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  workingHourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  todayBadge: {
    backgroundColor: '#E5F1FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  todayBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  hoursText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  hoursClosed: {
    color: '#FF3B30',
  },
  hoursOpen: {
    color: '#34C759',
  },
  hoursToday: {
    color: '#007AFF',
  },
  mapContainerSub: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8FBFF',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6F4FE',
    marginBottom: 15,
  },
  mapLineHSub: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E9F2FF',
  },
  mapLineVSub: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E9F2FF',
  },
  mapPinSmall: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  mapUserDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  routeLine: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    width: '30%',
    height: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 20,
  },
  mapAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  mapIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapAddressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1b2a',
  },
  mapAddressFull: {
    fontSize: 13,
    color: '#A0AEC0',
    marginTop: 2,
  },
  mapStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  mapStatBox: {
    flex: 1,
    backgroundColor: '#E5F1FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  mapStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  mapStatLabel: {
    fontSize: 12,
    color: '#6C727A',
    marginTop: 2,
  },
  getDirectionsBtn: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  getDirectionsTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  blurredImage: {
    opacity: 0.7,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restrictedContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  unlockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E6F4FE',
  },
  unlockIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  unlockTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 12,
    textAlign: 'center',
  },
  unlockSubtitle: {
    fontSize: 15,
    color: '#6C727A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  joinMembershipBtn: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  joinMembershipTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ClinicDetailsScreen;
