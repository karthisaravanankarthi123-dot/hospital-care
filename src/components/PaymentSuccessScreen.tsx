import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface PaymentSuccessScreenProps {
  onGoToDashboard: () => void;
  onDownloadReceipt: () => void;
  planDetails: {
    title: string;
    price: string;
  };
}

const PaymentSuccessScreen = ({ 
  onGoToDashboard, 
  onDownloadReceipt, 
  planDetails 
}: PaymentSuccessScreenProps) => {
  const insets = useSafeAreaInsets();

  const DetailRow = ({ label, value, color = '#1A1C1E' }: { label: string, value: string, color?: string }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, { color }]}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Feather name="check" size={50} color="#00C853" />
            </View>
          </View>
        </View>

        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.amountText}>{planDetails.price}</Text>
        <Text style={styles.successSubtitle}>Your {planDetails.title} plan is now active.</Text>

        {/* Transaction Details */}
        <View style={styles.detailsCard}>
          <DetailRow label="Plan" value={`${planDetails.title} Monthly`} />
          <DetailRow label="Transaction ID" value="#TXN-2026-03891" />
          <DetailRow label="Date" value="Mar 19, 2026" />
          <DetailRow label="Payment Method" value="Visa •••• 4821" />
          <DetailRow label="Next Billing" value="Apr 19, 2026" />
          <DetailRow label="Status" value="Confirmed" color="#00C853" />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.dashboardBtn} onPress={onGoToDashboard}>
          <Text style={styles.dashboardBtnText}>Go to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.receiptBtn} onPress={onDownloadReceipt}>
          <Text style={styles.receiptBtnText}>Download Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
    flexGrow: 1,
  },
  successIconContainer: {
    marginBottom: 30,
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00C85315',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#0061FF',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6C727A',
    fontWeight: '500',
    marginBottom: 40,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E8F1FF',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#A1A5AC',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  footer: {
    padding: 20,
    gap: 12,
  },
  dashboardBtn: {
    backgroundColor: '#0061FF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  receiptBtn: {
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  receiptBtnText: {
    color: '#1A1C1E',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PaymentSuccessScreen;
