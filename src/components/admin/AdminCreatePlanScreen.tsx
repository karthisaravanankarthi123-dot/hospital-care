import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminCreatePlanScreen = ({ onBack }: any) => {
  const insets = useSafeAreaInsets();
  
  const [form, setForm] = useState({
    planName: 'Clinic Pro',
    category: 'Business Plan',
    description: 'Includes all premium business features',
    price: '149.99',
    trialValue: '05',
    trialUnit: 'Day',
    billingCycle: 'Annual',
    features: [
      { id: '1', name: 'AI Video Generation (5/month)', enabled: true, icon: 'layers' },
      { id: '2', name: 'Advanced Analytics', enabled: true, icon: 'activity' },
      { id: '3', name: 'Unlimited Shorts Posting', enabled: true, icon: 'play' },
      { id: '4', name: 'Team Collaboration', enabled: false, icon: 'users' },
      { id: '5', name: 'Priority Support', enabled: true, icon: 'map-pin' },
    ],
  });

  const toggleFeature = (id: string) => {
    setForm({
      ...form,
      features: form.features.map(f => 
        f.id === id ? { ...f, enabled: !f.enabled } : f
      )
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Create Plan</Text>
          <Text style={styles.headerSubtitle}>Add New Subscription</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Plan Details</Text>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Plan Name</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Clinic Pro"
                placeholderTextColor="#A0AEC0"
                value={form.planName}
                onChangeText={(text) => setForm({ ...form, planName: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Select Categories</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownValue}>{form.category}</Text>
                <Feather name="chevron-down" size={18} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Includes all premium business features"
                placeholderTextColor="#A0AEC0"
                multiline
                numberOfLines={3}
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.pricePrefix}>
                  <Text style={styles.pricePrefixText}>$</Text>
                </View>
                <TextInput
                  style={styles.priceInput}
                  keyboardType="numeric"
                  value={form.price}
                  onChangeText={(text) => setForm({ ...form, price: text })}
                />
                <Text style={styles.priceSuffix}>/month</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Free Trial</Text>
              <View style={styles.trialRow}>
                <View style={[styles.input, styles.trialInputContainer]}>
                  <TextInput
                    style={styles.trialInput}
                    keyboardType="numeric"
                    value={form.trialValue}
                    onChangeText={(text) => setForm({ ...form, trialValue: text })}
                  />
                </View>
                <TouchableOpacity style={styles.trialDropdown}>
                  <Text style={styles.dropdownValue}>{form.trialUnit}</Text>
                  <Feather name="chevron-down" size={18} color="#4A5568" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Billing Cycle */}
          <Text style={styles.sectionLabel}>BILLING CYCLE</Text>
          <View style={styles.billingCycleContainer}>
            {['Monthly', 'Annual', 'Both'].map((cycle) => (
              <TouchableOpacity
                key={cycle}
                style={[
                  styles.cycleOption,
                  form.billingCycle === cycle && styles.activeCycleOption
                ]}
                onPress={() => setForm({ ...form, billingCycle: cycle })}
              >
                <Text style={[
                  styles.cycleText,
                  form.billingCycle === cycle && styles.activeCycleText
                ]}>
                  {cycle}
                </Text>
                {cycle === 'Annual' && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-20%</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Features */}
          <Text style={styles.sectionLabel}>FEATURES</Text>
          <View style={styles.featuresCard}>
            {form.features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureItem}
                onPress={() => toggleFeature(feature.id)}
              >
                <View style={styles.featureIconContainer}>
                  <Feather name={feature.icon as any} size={18} color="#007AFF" />
                </View>
                <Text style={styles.featureName}>{feature.name}</Text>
                <View style={[
                  styles.checkbox,
                  feature.enabled && styles.checkboxChecked
                ]}>
                  {feature.enabled && <Feather name="check" size={12} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Live Preview */}
          <Text style={styles.sectionLabel}>LIVE PREVIEW</Text>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewPlanName}>{form.planName.toUpperCase()}</Text>
              <View style={styles.previewPriceRow}>
                <Text style={styles.previewPrice}>${form.price}</Text>
                <Text style={styles.previewPeriod}> / {form.billingCycle === 'Annual' ? 'year' : 'month'}</Text>
              </View>
              <Text style={styles.previewDesc}>{form.description}</Text>
            </View>
            
            <View style={styles.previewFeaturesList}>
              {form.features.filter(f => f.enabled).map((feature) => (
                <View key={feature.id} style={styles.previewFeatureItem}>
                  <View style={styles.previewCheckContainer}>
                    <Feather name="check" size={12} color="#007AFF" />
                  </View>
                  <Text style={styles.previewFeatureText}>{feature.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Create Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    backgroundColor: '#1A2B3C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#A0AEC0',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#718096',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 24,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1C1E',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
  required: {
    color: '#FF3B30',
    marginLeft: 4,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 15,
    color: '#1A1C1E',
  },
  multilineInput: {
    height: 100,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownValue: {
    fontSize: 15,
    color: '#4A5568',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 12,
  },
  pricePrefix: {
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  pricePrefixText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  priceSuffix: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  trialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  trialInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  trialInput: {
    fontSize: 16,
    color: '#4A5568',
  },
  trialDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  billingCycleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cycleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 10,
    gap: 6,
  },
  activeCycleOption: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  cycleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  activeCycleText: {
    color: '#007AFF',
  },
  discountBadge: {
    backgroundColor: '#2DCE89',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    overflow: 'hidden',
    marginBottom: 32,
  },
  previewHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F7FF',
  },
  previewPlanName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#007AFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  previewPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  previewPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  previewPeriod: {
    fontSize: 14,
    color: '#718096',
  },
  previewDesc: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
  },
  previewFeaturesList: {
    padding: 24,
    gap: 12,
  },
  previewFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewCheckContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewFeatureText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#718096',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminCreatePlanScreen;
