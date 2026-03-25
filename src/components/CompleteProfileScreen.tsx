import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CATEGORIES = [
  'Clinic',
  'Doctor',
  'Ambulance',
  'Pharmacy',
  'Laboratory',
  'Hospital',
  'Diagnostic Center',
  'Wellness Center',
];

const CompleteProfileScreen = ({
  role,
  onBack,
  onComplete,
}: {
  role: string | null;
  onBack: () => void;
  onComplete: (data: any) => void;
}) => {
  const insets = useSafeAreaInsets();
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);

  // Hardware Back Button handled by App.tsx

  const isFormValid =
    firstName &&
    lastName &&
    (role === 'business' ? businessName && category : email && mobile);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="#6C727A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Complete Profile</Text>
          <Text style={styles.subtitle}>
            Just a few details to set up your account
          </Text>

          {/* Profile Image Picker (Hidden for business users as requested) */}
          {role !== 'business' && (
            <View style={styles.imagePickerContainer}>
              <View style={styles.imageCircle}>
                <Feather name="user" size={60} color="#CBD5E0" />
                <TouchableOpacity style={styles.cameraBadge}>
                  <Ionicons name="camera" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Business Info Section (Only for Business) */}
          {role === 'business' && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Business Info</Text>
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Business Name</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter business name"
                  placeholderTextColor="#A0AEC0"
                  value={businessName}
                  onChangeText={setBusinessName}
                />
              </View>
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Business Categories</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => setShowCategoryPicker(true)}
                >
                  <Text
                    style={[
                      styles.selectText,
                      category && styles.selectTextSelected,
                    ]}
                  >
                    {category || 'Select business category'}
                  </Text>
                  <Feather name="chevron-down" size={20} color="#6C727A" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Name and Details Section */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}
            >
              <Text style={styles.cardTitle}>
                {role === 'business' ? 'Owner Details' : 'Name and Details'}
              </Text>
              <Feather
                name={isDetailsExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6C727A"
              />
            </TouchableOpacity>

            {isDetailsExpanded && (
              <View style={styles.sectionBody}>
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>First Name</Text>
                    <Text style={styles.asterisk}>*</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter First Name"
                    placeholderTextColor="#A0AEC0"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Middle Name</Text>
                    <Text style={styles.asterisk}>*</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Middle Name"
                    placeholderTextColor="#A0AEC0"
                    value={middleName}
                    onChangeText={setMiddleName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Last Name</Text>
                    <Text style={styles.asterisk}>*</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Last Name"
                    placeholderTextColor="#A0AEC0"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>

                {role !== 'business' && (
                  <>
                    <View style={styles.inputGroup}>
                      <View style={styles.labelRow}>
                        <Text style={styles.label}>Email Address</Text>
                        <Text style={styles.asterisk}>*</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="name@company.com"
                        placeholderTextColor="#A0AEC0"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <View style={styles.labelRow}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <Text style={styles.asterisk}>*</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="+1 555-019-8829"
                        placeholderTextColor="#A0AEC0"
                        value={mobile}
                        onChangeText={setMobile}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </View>

          <View style={styles.footerInside}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !isFormValid && styles.saveButtonDisabled,
              ]}
              onPress={() => onComplete({
                firstName,
                middleName,
                lastName,
                businessName,
                category,
                email,
                mobile,
              })}
              disabled={!isFormValid}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.saveButtonText}>Save & Continue</Text>
                <Feather name="arrow-right" size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showCategoryPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Feather name="x" size={24} color="#1A1C1E" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(item);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      category === item && styles.itemTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                  {category === item && (
                    <Feather name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    marginBottom: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E6F4FE',
    borderWidth: 1.5,
    borderColor: '#007AFF40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#F8FBFF90', // More subtle/translucent background
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F1FF',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionBody: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '700', // Bolder labels like mockup
    color: '#1A1C1E',
  },
  asterisk: {
    color: '#FF4D4F',
    marginLeft: 4,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1C1E',
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  disabledInput: {
    backgroundColor: '#F2F4F7',
    color: '#667085',
  },
  selectInput: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  selectText: {
    fontSize: 15,
    color: '#A0AEC0',
    flex: 1,
  },
  selectTextSelected: {
    color: '#1A1C1E',
  },
  footerInside: {
    marginTop: 12,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    height: 56, // Taller button like mockup
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  itemText: {
    fontSize: 16,
    color: '#1A1C1E',
    fontWeight: '500',
  },
  itemTextActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
});

export default CompleteProfileScreen;
