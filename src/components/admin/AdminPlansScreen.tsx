import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminPlansScreen = ({ onBack, onNavigate, onCreatePlan, onViewMorePayments }: any) => {
  const insets = useSafeAreaInsets();

  const plans = [
    {
      title: 'Pro Plan',
      subtitle: 'Monthly subscription',
      price: '$29.99',
      period: '/month',
      stats: [
        { label: 'Active', value: '3,241' },
        { label: 'MRR', value: '$97.1K' },
        { label: 'Retention', value: '94%' },
      ],
    },
    {
      title: 'Business Plan',
      subtitle: 'Monthly / Annual',
      price: '$99',
      period: '/month',
      stats: [
        { label: 'Active', value: '487' },
        { label: 'MRR', value: '$48.2K' },
        { label: 'Retention', value: '97%' },
      ],
    },
    {
      title: 'Free Plan',
      subtitle: 'Limited access',
      price: '$0',
      period: '/month',
      stats: [
        { label: 'Active', value: '8,753' },
        { label: 'MRR', value: '—' },
        { label: 'Convert', value: '61%' },
      ],
    },
  ];

  const recentPayments = [
    {
      id: '1',
      name: 'Sarah Reynolds',
      plan: 'Pro',
      date: 'Mar 13, 2026',
      amount: '+$29.99',
      icon: 'user',
      iconColor: '#007AFF',
      iconBg: '#E1F0FF',
    },
    {
      id: '2',
      name: 'PhysioPlus Clinic',
      plan: 'Business',
      date: 'Mar 13, 2026',
      amount: '+$99.00',
      icon: 'briefcase',
      iconColor: '#1A1C1E',
      iconBg: '#F1F5F9',
    },
    {
      id: '3',
      name: 'James Mitchell',
      plan: 'Pro Annual',
      date: 'Mar 12, 2026',
      amount: '+$299.00',
      icon: 'user',
      iconColor: '#007AFF',
      iconBg: '#E1F0FF',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Plans</Text>
          <Text style={styles.headerSubtitle}>Create Plan & Payments Overview</Text>
        </View>
        <TouchableOpacity style={styles.createPlanButton} onPress={onCreatePlan}>
          <Feather name="plus" size={18} color="#FFFFFF" />
          <Text style={styles.createPlanText}>Create Plan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Plans Grid */}
        <View style={styles.plansList}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.planCard}>
              <View style={styles.planCardHeader}>
                <View>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                </View>
                <View style={styles.planPriceContainer}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>
              <View style={styles.planStatsDivider} />
              <View style={styles.planStatsRow}>
                {plan.stats.map((stat, sIndex) => (
                  <View key={sIndex} style={styles.planStatItem}>
                    <Text style={styles.planStatValue}>{stat.value}</Text>
                    <Text style={styles.planStatLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Recent Payments Section */}
        <View style={styles.paymentsHeader}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          <TouchableOpacity onPress={onViewMorePayments}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentsList}>
          {recentPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={[styles.paymentIconContainer, { backgroundColor: payment.iconBg }]}>
                <Feather name={payment.icon as any} size={20} color={payment.iconColor} />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>{payment.name}</Text>
                <Text style={styles.paymentMeta}>
                  {payment.plan} • {payment.date}
                </Text>
              </View>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Home')}>
          <Feather name="home" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Shorts')}>
          <Feather name="play-circle" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Shorts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Plans')}>
          <Feather name="calendar" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Users')}>
          <Feather name="shield" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Profile')}>
          <Feather name="user" size={24} color="#A0AEC0" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#1A2B3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitleContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#A0AEC0',
    fontSize: 12,
    marginTop: 2,
  },
  createPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  createPlanText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  plansList: {
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  planSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  planPriceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007AFF',
  },
  planPeriod: {
    fontSize: 11,
    color: '#A0AEC0',
  },
  planStatsDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 16,
  },
  planStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  planStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  planStatLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  paymentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  paymentsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  paymentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  paymentMeta: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#48BB78',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A2B3C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AdminPlansScreen;
