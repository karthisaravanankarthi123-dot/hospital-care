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

const AdminNotificationsScreen = ({ onBack }: any) => {
  const insets = useSafeAreaInsets();

  const notifications = [
    {
      group: 'TODAY',
      items: [
        {
          id: '1',
          title: '3 shorts',
          desc: 'were flagged by auto-review and need manual approval.',
          time: '2 minutes ago',
          icon: 'alert-triangle',
          iconColor: '#F5365C',
          iconBg: '#FFF5F5',
          unread: true,
        },
        {
          id: '2',
          title: 'PhysioPlus',
          desc: 'completed business registration — pending review.',
          time: '14 minutes ago',
          icon: 'home',
          iconColor: '#2DCE89',
          iconBg: '#EBFBEE',
          unread: true,
        },
        {
          id: '3',
          title: '$299',
          desc: 'Pro Annual payment processed for James Mitchell.',
          time: '1 hour ago',
          icon: 'credit-card',
          iconColor: '#007AFF',
          iconBg: '#F0F7FF',
          unread: true,
        },
        {
          id: '4',
          title: '18 new members',
          desc: 'registered in the last 2 hours.',
          time: '2 hours ago',
          icon: 'users',
          iconColor: '#5E72E4',
          iconBg: '#F6F9FC',
          unread: true,
        },
      ],
    },
    {
      group: 'YESTERDAY',
      items: [
        {
          id: '5',
          title: 'Server response spiked to 1.8s',
          desc: 'at 11:42 PM — resolved automatically.',
          time: 'Mar 12 • 11:55 PM',
          icon: 'alert-circle',
          iconColor: '#F6AD55',
          iconBg: '#FFF9F0',
          unread: false,
        },
        {
          id: '6',
          title: '142 shorts',
          desc: 'reviewed and approved in bulk by admin team.',
          time: 'Mar 12 • 3:20 PM',
          icon: 'check-circle',
          iconColor: '#2DCE89',
          iconBg: '#EBFBEE',
          unread: false,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2B3C" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>4 Unread Alerts</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((group, gIndex) => (
          <View key={gIndex} style={styles.groupContainer}>
            <Text style={styles.groupHeader}>{group.group}</Text>
            {group.items.map((item, iIndex) => (
              <View key={item.id} style={[
                styles.notificationItem,
                iIndex < group.items.length - 1 && styles.borderBottom
              ]}>
                <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                  <Feather name={item.icon as any} size={20} color={item.iconColor} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.notificationText}>
                    <Text style={styles.titleBold}>{item.title} </Text>
                    {item.desc}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
            ))}
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  groupContainer: {
    marginTop: 20,
  },
  groupHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B2C2D1',
    letterSpacing: 1.5,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'flex-start',
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
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#1A2B3C',
  },
  timeText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 12,
    marginTop: 10,
  },
});

export default AdminNotificationsScreen;
