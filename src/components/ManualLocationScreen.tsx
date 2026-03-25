import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
];
const STATES = [
  'Karnataka',
  'Maharashtra',
  'Delhi',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
  'Gujarat',
  'Kerala',
];

const ManualLocationScreen = ({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [houseInfo, setHouseInfo] = useState('');
  const [streetInfo, setStreetInfo] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [country] = useState('India');

  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);

  // Hardware Back Button handled by App.tsx

  const isFormValid = houseInfo && streetInfo && city && zipCode && state;

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
          <Text style={styles.title}>Your Location</Text>
          <Text style={styles.subtitle}>
            Just a few details to set up your account
          </Text>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>House / Flat / Building</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. 42B, Sunrise Apartments"
                placeholderTextColor="#A0AEC0"
                value={houseInfo}
                onChangeText={setHouseInfo}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Street / Area</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Street name or locality"
                placeholderTextColor="#A0AEC0"
                value={streetInfo}
                onChangeText={setStreetInfo}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1.5, marginRight: 12 }]}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>City</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => setShowCityPicker(true)}
                >
                  <Text
                    style={[
                      styles.selectText,
                      city ? styles.selectTextSelected : null,
                    ]}
                  >
                    {city || 'Select'}
                  </Text>
                  <Feather name="chevron-down" size={18} color="#6C727A" />
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Zip Code</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  value={zipCode}
                  onChangeText={setZipCode}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>State</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowStatePicker(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    state ? styles.selectTextSelected : null,
                  ]}
                >
                  {state || 'Select State'}
                </Text>
                <Feather name="chevron-down" size={20} color="#6C727A" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Country</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>
              <View style={[styles.selectInput, styles.disabledInput]}>
                <Text style={styles.disabledText}>{country}</Text>
                <Feather name="chevron-down" size={20} color="#6C727A" />
              </View>
            </View>
          </View>

          <View style={styles.footerInside}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !isFormValid && styles.saveButtonDisabled,
              ]}
              onPress={onComplete}
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

      {/* City Picker Modal */}
      <Modal
        visible={showCityPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCityPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <TouchableOpacity onPress={() => setShowCityPicker(false)}>
                <Feather name="x" size={24} color="#1A1C1E" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setCity(item);
                    setShowCityPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      city === item && styles.activeItemText,
                    ]}
                  >
                    {item}
                  </Text>
                  {city === item && (
                    <Feather name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* State Picker Modal */}
      <Modal
        visible={showStatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStatePicker(false)}>
                <Feather name="x" size={24} color="#1A1C1E" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={STATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setState(item);
                    setShowStatePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      state === item && styles.activeItemText,
                    ]}
                  >
                    {item}
                  </Text>
                  {state === item && (
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
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C727A',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#F8FBFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8F1FF',
  },
  inputGroup: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  asterisk: {
    color: '#FF4D4F',
    marginLeft: 4,
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
  },
  selectTextSelected: {
    color: '#1A1C1E',
  },
  row: {
    flexDirection: 'row',
  },
  disabledInput: {
    backgroundColor: '#F0F2F4',
    borderColor: '#E1E4E8',
  },
  disabledText: {
    color: '#A0AEC0',
    fontSize: 15,
  },
  footerInside: {
    marginTop: 32,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
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
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '70%',
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
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  itemText: {
    fontSize: 16,
  },
  activeItemText: {
    color: '#007AFF',
    fontWeight: '700',
  },
});

export default ManualLocationScreen;
