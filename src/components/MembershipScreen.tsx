import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface Plan {
  id: string;
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'pro',
    title: 'CLINIC PRO',
    price: '$149.99',
    subtitle: 'Includes all premium business features',
    features: [
      'AI Video Generation (5/mo)',
      'Advanced Analytics',
      'Unlimited Shorts Posting',
      'Priority Support',
    ],
    recommended: true,
  },
  {
    id: 'starter',
    title: 'CLINIC STARTER',
    price: '$99.99',
    subtitle: '',
    features: [
      'Standard Video Uploaded',
      'Basic Analytics',
      '10 Shorts Posting/mo',
    ],
  },
];

const MembershipScreen = ({ onContinue, onBack }: { onContinue: (planId: string) => void; onBack: () => void }) => {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#1A1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'monthly' && styles.toggleBtnActive]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text style={[styles.toggleText, billingCycle === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'yearly' && styles.toggleBtnActive]}
            onPress={() => setBillingCycle('yearly')}
          >
            <Text style={[styles.toggleText, billingCycle === 'yearly' && styles.toggleTextActive]}>Yearly</Text>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => (
            <View key={plan.id} style={{ position: 'relative' }}>
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>RECOMMENDED</Text>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.planCard,
                  plan.recommended && styles.proCard,
                  selectedPlan === plan.id && styles.selectedCard,
                  !plan.recommended && { marginTop: 10 }
                ]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.9}
              >
                <Text style={[styles.planTitle, plan.recommended && styles.proTitle]}>{plan.title}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceSymbol}>{plan.price}</Text>
                  <Text style={styles.priceSub}> / Month</Text>
                </View>
                {plan.subtitle ? <Text style={styles.planSubtitle}>{plan.subtitle}</Text> : null}

                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color={plan.recommended ? "#007AFF" : "#A0AEC0"}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={styles.activateButton}
          onPress={() => onContinue(selectedPlan)}
        >
          <Text style={styles.activateText}>Activate Business Plan</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
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
    paddingBottom: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    borderRadius: 14,
    padding: 4,
    marginBottom: 30,
  },
  toggleBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C727A',
  },
  toggleTextActive: {
    color: '#007AFF',
  },
  plansContainer: {
    gap: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  proCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  selectedCard: {
    backgroundColor: '#FFFFFF',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#00B4D8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    zIndex: 10,
  },
  recommendedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  planTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#007AFF',
    marginBottom: 12,
    letterSpacing: 1,
  },
  proTitle: {
    color: '#007AFF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceSymbol: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  priceSub: {
    fontSize: 16,
    color: '#6C727A',
    fontWeight: '500',
  },
  planSubtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 24,
  },
  featuresContainer: {
    marginTop: 10,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  activateButton: {
    backgroundColor: '#0061FF',
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activateText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});

export default MembershipScreen;
