import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions,
  StatusBar,
  Platform,
  Switch,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, ShortsIcon, DetailsIcon, ProfileIcon } from './NavigationIcons';

const { width } = Dimensions.get('window');

// ----------------- SVG Icons -----------------

// ----------------- Page SVGs -----------------
const MailIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0055ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <Path d="M22 6l-10 7L2 6" />
    </Svg>
);

const PhoneIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0055ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </Svg>
);

const ImageIconOutline = ({ color = "#a0aec0" }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <Circle cx="8.5" cy="8.5" r="1.5" />
        <Path d="M21 15l-5-5-5 5M5 21l8-8 8 8" />
    </Svg>
);

const PlusIconOutline = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 5v14M5 12h14" />
    </Svg>
);

const EditPenIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </Svg>
);

const CheckCircleSolid = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="#0055ff">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M10 14.5l-3-3 1.5-1.5 1.5 1.5 4.5-4.5 1.5 1.5-6 6z" fill="#FFFFFF" />
    </Svg>
);


const DefaultSchedule = [
  { id: '1', day: 'Sunday', isOpen: false, hours: '08:00 AM - 05:00 PM' },
  { id: '2', day: 'Monday', isOpen: true, hours: '08:00 AM - 05:00 PM' },
  { id: '3', day: 'Tuesday', isOpen: true, hours: '08:00 AM - 05:00 PM' },
  { id: '4', day: 'Wednesday', isOpen: true, hours: '08:00 AM - 05:00 PM' },
  { id: '5', day: 'Thursday', isOpen: true, hours: '08:00 AM - 05:00 PM' },
  { id: '6', day: 'Friday', isOpen: true, hours: '08:00 AM - 05:00 PM' },
  { id: '7', day: 'Saturday', isOpen: false, hours: '08:00 AM - 05:00 PM' },
];

const DefaultFacilities = [
  { id: '1', title: 'X-Ray', desc: 'Diagnostic imaging', enabled: false },
  { id: '2', title: 'Lab Tests', desc: 'In-house pathology', enabled: true },
  { id: '3', title: 'In-house Pharmacy', desc: 'Medicines on site', enabled: true },
  { id: '4', title: 'Parking', desc: 'Free for patients', enabled: true },
  { id: '5', title: 'Wheelchair Access', desc: 'Accessible entry & ramps', enabled: false },
];

const DetailsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();



  const [activeTab, setActiveTab] = useState('Basic Info');
  const tabs = ['Basic Info', 'Working Hours', 'Services'];

  const [schedule, setSchedule] = useState(DefaultSchedule);
  const [facilities, setFacilities] = useState(DefaultFacilities);

  const toggleDay = (id: string) => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, isOpen: !item.isOpen } : item));
  };
  
  const resetSchedule = () => setSchedule(DefaultSchedule);

  const toggleFacility = (id: string) => {
    setFacilities(facilities.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header Container */}
      <View style={[styles.headerArea, { paddingTop: insets.top }]}>
            <Text style={styles.headerTitle}>Business Details</Text>
            
            {/* Tabs Row */}
            <View style={styles.tabsRow}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity 
                            key={tab} 
                            style={[styles.tabButton, isActive && styles.tabButtonActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
         </View>

      <ScrollView 
        style={styles.contentWrap} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
          
          {activeTab === 'Basic Info' && (
            <View>
              {/* Card 1: Basic Info Details */}
              <View style={styles.cardBlock}>
                  <View style={styles.infoGroup}>
                     <Text style={styles.groupLabel}>Business Type</Text>
                     <View style={styles.bluePill}>
                         <Text style={styles.bluePillText}>Primary Care / Cardiology</Text>
                     </View>
                  </View>

                  <View style={styles.infoGroup}>
                     <Text style={styles.groupLabel}>Business Bio</Text>
                     <Text style={styles.bioText}>
                        We provide comprehensive primary care for individuals and families, focusing on preventive care, routine checkups, and chronic disease management.
                     </Text>
                  </View>

                  <View style={styles.contactRow}>
                      <View style={styles.iconBox}>
                          <MailIcon />
                      </View>
                      <View style={styles.contactTextCol}>
                          <Text style={styles.contactLabel}>Email</Text>
                          <Text style={styles.contactValue}>sarah.wilson@healthcare.com</Text>
                      </View>
                  </View>

                  <View style={styles.contactRow}>
                      <View style={styles.iconBox}>
                          <PhoneIcon />
                      </View>
                      <View style={styles.contactTextCol}>
                          <Text style={styles.contactLabel}>Phone</Text>
                          <Text style={styles.contactValue}>+1 (555) 012-3456</Text>
                      </View>
                  </View>
              </View>

              {/* Card 2: Business Images */}
              <View style={styles.cardBlock}>
                  <Text style={[styles.groupLabel, { marginBottom: 15 }]}>Business Images</Text>
                  <View style={styles.imageBoxesRow}>
                      <View style={[styles.imageBlock, { backgroundColor: '#dbeafe' }]}>
                          <ImageIconOutline color="#93c5fd" />
                      </View>
                      <View style={[styles.imageBlock, { backgroundColor: '#dcfce7' }]}>
                          <ImageIconOutline color="#86efac" />
                      </View>
                      <TouchableOpacity style={[styles.imageBlock, styles.imageBlockEmpty]}>
                          <PlusIconOutline />
                      </TouchableOpacity>
                  </View>
              </View>

              {/* Edit Button */}
              <TouchableOpacity style={styles.editButton}>
                 <EditPenIcon />
                 <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Working Hours' && (
             <View style={styles.scheduleCardBlock}>
                <View style={styles.scheduleHeaderRow}>
                   <Text style={styles.scheduleCardTitle}>Schedule Details</Text>
                   <TouchableOpacity onPress={resetSchedule}>
                      <Text style={styles.resetTextLink}>RESET</Text>
                   </TouchableOpacity>
                </View>

                {schedule.map((dayItem) => {
                   const isClosedText = !dayItem.isOpen;
                   return (
                       <View key={dayItem.id} style={styles.dayRowBox}>
                          <View style={styles.dayLeftCol}>
                             <Text style={[styles.dayNameText, isClosedText && styles.dayNameTextClosed]}>
                                {dayItem.day}
                             </Text>
                             <Text style={[styles.dayTimeText, isClosedText && styles.dayTimeTextClosed]}>
                                {dayItem.isOpen ? dayItem.hours : 'Not Available'}
                             </Text>
                          </View>
                          <View style={styles.dayRightCol}>
                             <Switch
                                value={dayItem.isOpen}
                                onValueChange={() => toggleDay(dayItem.id)}
                                trackColor={{ false: '#e2e8f0', true: '#0055ff' }}
                                thumbColor={'#ffffff'}
                                style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
                             />
                             <Text style={[styles.statusToggleText, { color: dayItem.isOpen ? '#34c759' : '#ff3b30' }]}>
                                {dayItem.isOpen ? 'OPEN' : 'CLOSED'}
                             </Text>
                          </View>
                       </View>
                   );
                })}
             </View>
          )}

          {activeTab === 'Services' && (
             <View>
                {/* Specialities Block */}
                <View style={styles.servicesTopCard}>
                    <View style={styles.scheduleHeaderRow}>
                       <Text style={styles.scheduleCardTitle}>Specialities</Text>
                       <TouchableOpacity>
                          <Text style={styles.resetTextLink}>+ ADD</Text>
                       </TouchableOpacity>
                    </View>
                    <View style={styles.specialitiesWrap}>
                        <View style={styles.specialityPill}>
                           <CheckCircleSolid />
                           <Text style={styles.specialityPillText}>General Medicine</Text>
                        </View>
                        <View style={styles.specialityPill}>
                           <CheckCircleSolid />
                           <Text style={styles.specialityPillText}>Dental</Text>
                        </View>
                        <View style={styles.specialityPill}>
                           <CheckCircleSolid />
                           <Text style={styles.specialityPillText}>Cardiology</Text>
                        </View>
                    </View>
                </View>

                {/* Facilities Block */}
                <View style={styles.facilitiesCardBlock}>
                    <Text style={[styles.scheduleCardTitle, { marginBottom: 20 }]}>Facilities</Text>

                    {facilities.map((fac) => (
                        <View key={fac.id} style={styles.facilityRowBox}>
                            <View style={styles.dayLeftCol}>
                               <Text style={styles.dayNameText}>{fac.title}</Text>
                               <Text style={styles.dayTimeText}>{fac.desc}</Text>
                            </View>
                            <View style={[styles.dayRightCol, { paddingRight: 5 }]}>
                               <Switch
                                  value={fac.enabled}
                                  onValueChange={() => toggleFacility(fac.id)}
                                  trackColor={{ false: '#e2e8f0', true: '#0055ff' }}
                                  thumbColor={'#ffffff'}
                                  style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
                               />
                            </View>
                        </View>
                    ))}
                </View>
             </View>
          )}

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNavContainer, { bottom: Math.max(insets.bottom, 20) }]}>
         <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
               <HomeIcon active={false} size={24} />
               <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ShortsScreen')}>
               <ShortsIcon active={false} size={24} />
               <Text style={styles.navText}>Shorts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
              <View style={styles.navItemActiveBg}>
                 <DetailsIcon active={true} size={24} />
                 <Text style={styles.navTextActive}>Details</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
               <ProfileIcon active={false} size={24} />
               <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
         </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eff5fb', // the light bluish background of content
  },
  headerArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15, // Subtle rounding into the body
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 15,
    marginBottom: 25,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#0055ff', // Active underline
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#0055ff',
  },
  contentWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#e2e8f0', // faint border
  },
  infoGroup: {
    marginBottom: 20,
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  bluePill: {
    backgroundColor: '#f0f7ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bluePillText: {
    color: '#0055ff',
    fontSize: 14,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 13,
    color: '#8e99af',
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextCol: {
    marginLeft: 15,
  },
  contactLabel: {
    fontSize: 11,
    color: '#8e99af',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  imageBoxesRow: {
    flexDirection: 'row',
  },
  imageBlock: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlockEmpty: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0055ff',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#0055ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scheduleCardBlock: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#dbeafe', // light blue border outline for schedule card
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  scheduleCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  resetTextLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007aff',
    letterSpacing: 0.5,
  },
  dayRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9', // subtle boundary for inner day blocks
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  dayLeftCol: {
    flex: 1,
  },
  dayNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  dayNameTextClosed: {
    color: '#cbd5e1',
  },
  dayTimeText: {
    fontSize: 12,
    color: '#8e99af',
  },
  dayTimeTextClosed: {
    color: '#e2e8f0',
  },
  dayRightCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusToggleText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  servicesTopCard: {
    backgroundColor: '#f0f7ff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#dbeafe', 
  },
  specialitiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cce4ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  specialityPillText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0055ff',
    marginLeft: 6,
  },
  facilitiesCardBlock: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
  },
  facilityRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9', 
  },
  bottomSpacer: {
    height: 120, // Space for nav
  },
  bottomNavContainer: {
    position: 'absolute',
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

export default DetailsScreen;
