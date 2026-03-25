import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface TabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const Tab = ({ label, isActive, onPress }: TabProps) => (
  <TouchableOpacity 
    style={[styles.tab, isActive && styles.activeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
  </TouchableOpacity>
);

const BusinessDetailsScreen = ({ 
  onBack, 
  onContinue,
  onSkip 
}: { 
  onBack: () => void; 
  onContinue: () => void;
  onSkip: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Basic Info');
  const [businessType, setBusinessType] = useState('Clinic');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  // Working Hours State
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [openingTime, setOpeningTime] = useState('08:00');
  const [openingPeriod, setOpeningPeriod] = useState('AM');
  const [closingTime, setClosingTime] = useState('05:00');
  const [closingPeriod, setClosingPeriod] = useState('PM');
  const [showScheduleDetails, setShowScheduleDetails] = useState(true); // Default to true as per image

  // Services State
  const [selectedSpecialities, setSelectedSpecialities] = useState(['General Medicine', 'Dental', 'Pediatrics']);
  const [facilities, setFacilities] = useState([
    { id: '1', title: 'X-Ray', subtitle: 'Diagnostic imaging', enabled: false },
    { id: '2', title: 'Lab Tests', subtitle: 'In-house pathology', enabled: true },
    { id: '3', title: 'In-house Pharmacy', subtitle: 'Medicines on site', enabled: true },
    { id: '4', title: 'Parking', subtitle: 'Free for patients', enabled: true },
    { id: '5', title: 'Wheelchair Access', subtitle: 'Accessible entry & ramps', enabled: false },
  ]);

  const SPECIALITIES = [
    'General Medicine', 'Dental', 'Pediatrics', 'Cardiology',
    'Dermatology', 'Physiotherapy', 'Gynaecology', 'Orthopaedics'
  ];

  const toggleSpeciality = (spec: string) => {
    setSelectedSpecialities(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const toggleFacility = (id: string) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const DAYS_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAY_SHORT_TO_LONG: Record<string, string> = {
    'Sun': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday'
  };

  const renderBasicInfo = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Business Type</Text>
          <Text style={styles.requiredAsterisk}>*</Text>
        </View>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{businessType}</Text>
          <Feather name="chevron-down" size={20} color="#6C727A" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Business Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about your business"
          placeholderTextColor="#A1A5AC"
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.requiredAsterisk}>*</Text>
        </View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="name@company.com"
          placeholderTextColor="#A1A5AC"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.requiredAsterisk}>*</Text>
        </View>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="+1 555-019-8829"
          placeholderTextColor="#A1A5AC"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Upload Business Images</Text>
        <TouchableOpacity style={[styles.uploadBox, styles.dashedBorder]}>
          <View style={styles.uploadIconContainer}>
            <Feather name="image" size={24} color="#007AFF" />
          </View>
          <Text style={styles.uploadTitle}>Tap to add photos</Text>
          <Text style={styles.uploadSubtitle}>JPG, PNG up to 5MB</Text>
        </TouchableOpacity>
        
        <View style={styles.thumbnailRow}>
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder, { backgroundColor: '#D0E7FF' }]}>
             <Feather name="image" size={20} color="rgba(0, 122, 255, 0.5)" />
          </View>
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder, { backgroundColor: '#C1F2D1' }]}>
             <Feather name="image" size={20} color="rgba(52, 199, 89, 0.5)" />
          </View>
          <TouchableOpacity style={[styles.thumbnail, styles.addThumbnailButton]}>
             <Feather name="plus" size={24} color="#E1E4E8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderWorkingHours = () => (
    <View style={styles.workingHoursContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Operating Hours</Text>
      </View>
      
      <View style={styles.daysRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity 
              key={day}
              style={[styles.dayCircle, isSelected && styles.activeDayCircle]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.dayText, isSelected && styles.activeDayText]}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.timeSettingsBox}>
        <Text style={styles.settingsLabel}>SET TIME FOR SELECTED DAYS</Text>
        
        <View style={styles.timeInputsRow}>
          <View style={styles.timeInputGroup}>
            <Text style={styles.timeInputLabel}>OPENING TIME</Text>
            <View style={styles.timeInputWrapper}>
              <TextInput 
                style={styles.timeInput}
                value={openingTime}
                onChangeText={setOpeningTime}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.periodDropdown}>
                <Text style={styles.periodText}>{openingPeriod}</Text>
                <Feather name="chevron-down" size={14} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.timeInputGroup}>
            <Text style={styles.timeInputLabel}>CLOSING TIME</Text>
            <View style={styles.timeInputWrapper}>
              <TextInput 
                style={styles.timeInput}
                value={closingTime}
                onChangeText={setClosingTime}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.periodDropdown}>
                <Text style={styles.periodText}>{closingPeriod}</Text>
                <Feather name="chevron-down" size={14} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveScheduleButton}>
          <Text style={styles.saveScheduleText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.scheduleDetailsCard, showScheduleDetails && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: 0 }]}>
        <Text style={styles.scheduleDetailsTitle}>Schedule Details</Text>
        <TouchableOpacity onPress={() => setShowScheduleDetails(!showScheduleDetails)}>
          <Text style={styles.viewLink}>{showScheduleDetails ? 'HIDE' : 'VIEW'}</Text>
        </TouchableOpacity>
      </View>

      {showScheduleDetails && (
        <View style={styles.expandedScheduleContainer}>
          {DAYS_ORDER.map((day) => {
            const isSelected = selectedDays.some(d => DAY_SHORT_TO_LONG[d] === day);
            return (
              <View key={day} style={styles.dayScheduleRow}>
                <View style={styles.dayInfo}>
                  <Text style={[styles.dayLabel, !isSelected && styles.disabledDayLabel]}>{day}</Text>
                  <Text style={[styles.dayTimeSub, !isSelected && styles.disabledDayTimeSub]}>
                    {isSelected ? `${openingTime} ${openingPeriod} - ${closingTime} ${closingPeriod}` : 'Not Available'}
                  </Text>
                </View>
                <View style={styles.dayStatusContainer}>
                  <View style={[styles.miniSwitch, isSelected ? styles.miniSwitchOn : styles.miniSwitchOff]}>
                    <View style={[styles.miniSwitchThumb, isSelected ? styles.miniSwitchThumbOn : styles.miniSwitchThumbOff]} />
                  </View>
                  <Text style={[styles.statusLabel, isSelected ? styles.statusOpen : styles.statusClosed]}>
                    {isSelected ? 'OPEN' : 'CLOSED'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  const renderServices = () => (
    <View style={styles.servicesContainer}>
      {/* Specialities */}
      <View style={styles.servicesCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Specialities</Text>
        </View>
        <View style={styles.specialitiesGrid}>
          {SPECIALITIES.map((spec) => {
            const isSelected = selectedSpecialities.includes(spec);
            return (
              <TouchableOpacity
                key={spec}
                style={[styles.specChip, isSelected && styles.specChipSelected]}
                onPress={() => toggleSpeciality(spec)}
              >
                <Feather 
                  name={isSelected ? "check-circle" : "plus"} 
                  size={16} 
                  color={isSelected ? "#FFFFFF" : "#6C727A"} 
                />
                <Text style={[styles.specText, isSelected && styles.specTextSelected]}>{spec}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Facilities */}
      <View style={styles.servicesCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Facilities</Text>
        </View>
        <View style={styles.facilitiesList}>
          {facilities.map((facility) => (
            <View key={facility.id} style={styles.facilityItem}>
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityTitle}>{facility.title}</Text>
                <Text style={styles.facilitySubtitle}>{facility.subtitle}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleFacility(facility.id)}
                style={[styles.switchContainer, facility.enabled ? styles.switchOn : styles.switchOff]}
              >
                <View style={[styles.switchThumb, facility.enabled ? styles.switchThumbOn : styles.switchThumbOff]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#6C727A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Details</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Basic Info', 'Working Hours', 'Services'].map((tab) => (
          <Tab 
            key={tab} 
            label={tab} 
            isActive={activeTab === tab} 
            onPress={() => setActiveTab(tab)} 
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profilePlaceholder}>
              <Feather name="user" size={60} color="#A1A5AC" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Feather name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'Basic Info' && renderBasicInfo()}
        {activeTab === 'Working Hours' && renderWorkingHours()}
        {activeTab === 'Services' && renderServices()}

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
            <Text style={styles.primaryButtonText}>Save & Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Changed from #F0F7FF to #FFFFFF
    paddingBottom: 15,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F0F7FF', // Match the light blue of the overall page
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Changed from #F0F7FF to #FFFFFF
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 122, 255, 0.05)',
    gap: 30,
  },
  tab: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#6C727A',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1.5,
    borderColor: '#D0E7FF',
    padding: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    backgroundColor: '#E1E9F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.08)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  requiredAsterisk: {
    color: '#FF3B30',
    marginLeft: 4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#6C727A',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1C1E',
    backgroundColor: '#F8F9FA',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },
  uploadSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  uploadBox: {
    height: 140,
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dashedBorder: {
    borderWidth: 1,
    borderColor: '#D0E7FF',
    borderStyle: 'dashed',
  },
  uploadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#A1A5AC',
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbnail: {
    width: (width - 104) / 4, // 20*2 padding + 20 form padding + 12*3 gaps = 76 padding/gap. (width-76)/4
    height: 70,
    borderRadius: 12,
  },
  thumbnailPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addThumbnailButton: {
    backgroundColor: '#F8FAFF',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 30,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#A1A5AC',
    fontWeight: '600',
  },
  placeholderTab: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  placeholderText: {
    color: '#6C727A',
    textAlign: 'center',
  },
  // Working Hours Styles
  workingHoursContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.08)',
  },
  cardHeader: {
    padding: 20,
    backgroundColor: '#F8FAFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 122, 255, 0.05)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeDayCircle: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF10',
  },
  dayText: {
    fontSize: 12,
    color: '#A1A5AC',
    fontWeight: '600',
  },
  activeDayText: {
    color: '#007AFF',
  },
  timeSettingsBox: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0E7FF',
  },
  settingsLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6C727A',
    marginBottom: 20,
  },
  timeInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  timeInputGroup: {
    flex: 1,
  },
  timeInputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 8,
  },
  timeInputWrapper: {
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  timeInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  periodDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E1E4E8',
    backgroundColor: '#F0F7FF',
    gap: 4,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
  },
  saveScheduleButton: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveScheduleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  scheduleDetailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#F8FAFF',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D0E7FF',
  },
  scheduleDetailsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  viewLink: {
    fontSize: 12,
    fontWeight: '800',
    color: '#007AFF',
  },
  // Expanded Schedule Styles
  expandedScheduleContainer: {
    backgroundColor: '#F8FAFF',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#D0E7FF',
  },
  dayScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 122, 255, 0.05)',
  },
  dayInfo: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 2,
  },
  disabledDayLabel: {
    color: '#A1A5AC',
  },
  dayTimeSub: {
    fontSize: 12,
    color: '#6C727A',
    fontWeight: '500',
  },
  disabledDayTimeSub: {
    color: '#CBD5E0',
  },
  dayStatusContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusOpen: {
    color: '#34C759',
  },
  statusClosed: {
    color: '#FF3B30',
  },
  miniSwitch: {
    width: 32,
    height: 18,
    borderRadius: 9,
    padding: 2,
    justifyContent: 'center',
  },
  miniSwitchOn: {
    backgroundColor: '#007AFF',
  },
  miniSwitchOff: {
    backgroundColor: '#CBD5E0',
  },
  miniSwitchThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  miniSwitchThumbOn: {
    alignSelf: 'flex-end',
  },
  miniSwitchThumbOff: {
    alignSelf: 'flex-start',
  },
  // Services Styles
  servicesContainer: {
    paddingBottom: 20,
  },
  servicesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E8F1FF',
    overflow: 'hidden',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  specialitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 10,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8F1FF',
    backgroundColor: '#F8FBFF',
    gap: 8,
  },
  specChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  specText: {
    fontSize: 14,
    color: '#6C727A',
    fontWeight: '600',
  },
  specTextSelected: {
    color: '#FFFFFF',
  },
  facilitiesList: {
    padding: 16,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F7FF',
  },
  facilityInfo: {
    flex: 1,
  },
  facilityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C1E',
    marginBottom: 2,
  },
  facilitySubtitle: {
    fontSize: 13,
    color: '#6C727A',
  },
  switchContainer: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  switchOn: {
    backgroundColor: '#007AFF',
  },
  switchOff: {
    backgroundColor: '#CBD5E0',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  switchThumbOff: {
    alignSelf: 'flex-start',
  },
});

export default BusinessDetailsScreen;
