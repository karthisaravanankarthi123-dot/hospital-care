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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminPaymentsScreen = ({ onBack }: any) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All (2847)');

  const stats = [
    { label: 'Total MRR', value: '$145K', trend: '↑ 12%', trendColor: '#2DCE89' },
    { label: 'Transactions', value: '2,847', trend: '↑ 8%', trendColor: '#2DCE89' },
    { label: 'Success', value: '98.2%', trend: '↑ 0.4%', trendColor: '#2DCE89' },
  ];

  const tabs = ['All (2847)', 'Completed', 'Pending', 'Refunds'];

  const transactions = [
    {
      date: 'MAR 19, 2026',
      items: [
        {
          id: '1',
          name: 'Sarah Reynolds',
          meta: 'Pro • Card **4821',
          amount: '+$29.99',
          status: 'Completed',
          icon: 'user',
          iconBg: '#F0F7FF',
          iconColor: '#007AFF',
        },
        {
          id: '2',
          name: 'PhysioPlus Clinic',
          meta: 'Business • Invoice',
          amount: '+$99.00',
          status: 'Completed',
          icon: 'briefcase',
          iconBg: '#F8FAFC',
          iconColor: '#1A1C1E',
        },
        {
          id: '3',
          name: 'Marcus Chen',
          meta: 'Pro • Card **1193',
          amount: '+$29.99',
          status: 'Pending',
          icon: 'user',
          iconBg: '#FFF9F0',
          iconColor: '#F6AD55',
        },
      ],
    },
    {
      date: 'MAR 18, 2026',
      items: [
        {
          id: '4',
          name: 'James Mitchell',
          meta: 'Pro Annual • Bank',
          amount: '+$29.99',
          status: 'Completed',
          icon: 'user',
          iconBg: '#F0F7FF',
          iconColor: '#007AFF',
        },
        {
          id: '5',
          name: 'Alicia Torres',
          meta: 'Pro • Refund',
          amount: '-$99.00',
          status: 'Refund',
          icon: 'user',
          iconBg: '#FFF5F5',
          iconColor: '#F5365C',
        },
        {
          id: '6',
          name: 'NexaHealth Ltd',
          meta: 'Business Annual',
          amount: '+$29.99',
          status: 'Pending',
          icon: 'user',
          iconBg: '#FFF9F0',
          iconColor: '#F6AD55',
        },
      ],
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return { bg: '#EBFBEE', text: '#2DCE89' };
      case 'Pending':
        return { bg: '#FFF9F0', text: '#F6AD55' };
      case 'Refund':
        return { bg: '#FFF5F5', text: '#F5365C' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
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
          <Text style={styles.headerTitle}>All Payments</Text>
          <Text style={styles.headerSubtitle}>Transaction History</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section with Dark Background */}
        <View style={styles.darkStatsSection}>
          <View style={styles.statsRow}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statTrend, { color: stat.trendColor }]}>{stat.trend}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          {/* Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.tabsContainer}
            contentContainerStyle={{ gap: 8 }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#A0AEC0" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search transactions..."
              placeholderTextColor="#A0AEC0"
            />
          </View>

          {/* Transactions List */}
          {transactions.map((group, gIndex) => (
            <View key={gIndex} style={styles.groupContainer}>
              <Text style={styles.groupDate}>{group.date}</Text>
              <View style={styles.groupCard}>
                {group.items.map((item, iIndex) => {
                  const statusStyle = getStatusStyle(item.status);
                  return (
                    <View key={item.id} style={[
                      styles.transactionItem,
                      iIndex < group.items.length - 1 && styles.borderBottom
                    ]}>
                      <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                        <Feather name={item.icon as any} size={18} color={item.iconColor} />
                      </View>
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.meta}>{item.meta}</Text>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={[
                          styles.amount,
                          item.status === 'Refund' && { color: '#F5365C' }
                        ]}>
                          {item.amount}
                        </Text>
                        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                          <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          {/* Monthly Summary */}
          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.summaryLabel}>This Month</Text>
              <Text style={styles.summaryValue}>$48.7K</Text>
            </View>
            <View style={styles.trendRow}>
              <Text style={styles.trendMeta}>vs Last Month</Text>
              <Text style={styles.trendValue}>↑ +$6.2K</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.exportButton}>
            <Feather name="download" size={18} color="#FFFFFF" />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  },
  darkStatsSection: {
    backgroundColor: '#1A2B3C',
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 4,
  },
  statTrend: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  transactionsContainer: {
    paddingHorizontal: 16,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F7F9FC',
  },
  tabsContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#718096',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1A1C1E',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupDate: {
    fontSize: 12,
    fontWeight: '800',
    color: '#A0AEC0',
    letterSpacing: 1,
    marginBottom: 12,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  meta: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2DCE89',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#1A2B3C',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#A0AEC0',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  trendRow: {
    alignItems: 'flex-end',
  },
  trendMeta: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  trendValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2DCE89',
    marginTop: 4,
  },
  exportButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  exportText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminPaymentsScreen;
