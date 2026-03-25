import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface PaymentScreenProps {
  onBack: () => void;
  onPay: () => void;
  selectedPlan: {
    id: string;
    title: string;
    price: string;
  };
}

const PaymentScreen = ({ onBack, onPay, selectedPlan }: PaymentScreenProps) => {
  const insets = useSafeAreaInsets();
  const [activeMethod, setActiveMethod] = useState('Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const PAYMENT_METHODS = [
    { id: 'Card', icon: 'credit-card-outline' },
    { id: 'UPI', icon: 'bank-outline' },
    { id: 'NetBank', icon: 'bank-transfer' },
    { id: 'Wallet', icon: 'wallet-outline' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
        
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="#1A1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 44 }} />
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Order Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.sectionLabel}>ORDER SUMMARY</Text>
              <View style={styles.planRow}>
                <View>
                  <Text style={styles.labelSmall}>PLAN</Text>
                  <Text style={styles.planName}>{selectedPlan.title}</Text>
                </View>
                <View style={styles.priceContainer}>
                   <Text style={styles.planPrice}>{selectedPlan.price}</Text>
                   <Text style={styles.perMonth}>/ month</Text>
                </View>
              </View>
            </View>

            {/* Payment Method */}
            <Text style={styles.sectionLabel}>PAYMENT METHOD</Text>
            <View style={styles.methodsRow}>
              {PAYMENT_METHODS.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodBtn,
                    activeMethod === method.id && styles.methodBtnActive,
                  ]}
                  onPress={() => setActiveMethod(method.id)}
                >
                  <MaterialCommunityIcons 
                    name={method.icon as any} 
                    size={24} 
                    color={activeMethod === method.id ? "#0061FF" : "#6C727A"} 
                  />
                  <Text style={[
                    styles.methodText,
                    activeMethod === method.id && styles.methodTextActive
                  ]}>{method.id}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Card Form */}
            {activeMethod === 'Card' && (
              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <Text style={styles.asterisk}>*</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#A0AEC0"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.inputLabel}>Cardholder Name</Text>
                    <Text style={styles.asterisk}>*</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="As shown on card"
                    placeholderTextColor="#A0AEC0"
                    value={cardName}
                    onChangeText={setCardName}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 15 }]}>
                    <View style={styles.labelRow}>
                      <Text style={styles.inputLabel}>Expiry</Text>
                      <Text style={styles.asterisk}>*</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="MM / YY"
                      placeholderTextColor="#A0AEC0"
                      value={expiry}
                      onChangeText={setExpiry}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <View style={styles.labelRow}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <Text style={styles.asterisk}>*</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="..."
                      placeholderTextColor="#A0AEC0"
                      value={cvv}
                      onChangeText={setCvv}
                      secureTextEntry
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Due Today</Text>
              <Text style={styles.totalPrice}>{selectedPlan.price}</Text>
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <TouchableOpacity style={styles.payBtn} onPress={onPay}>
              <Text style={styles.payBtnText}>Pay Now {selectedPlan.price}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E8F1FF',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A1A5AC',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelSmall: {
    fontSize: 10,
    color: '#0061FF',
    fontWeight: '800',
    marginBottom: 4,
  },
  planName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0061FF',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0061FF',
  },
  perMonth: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  methodBtn: {
    width: (width - 70) / 4,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    gap: 4,
  },
  methodBtnActive: {
    borderColor: '#0061FF',
    backgroundColor: '#F0F6FF',
  },
  methodText: {
    fontSize: 10,
    color: '#6C727A',
    fontWeight: '700',
  },
  methodTextActive: {
    color: '#0061FF',
  },
  cardForm: {
    gap: 20,
    marginBottom: 30,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  asterisk: {
    color: '#FF3B30',
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
  row: {
    flexDirection: 'row',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  totalLabel: {
    fontSize: 14,
    color: '#A1A5AC',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  payBtn: {
    backgroundColor: '#0061FF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0061FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});

export default PaymentScreen;
