import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const notifications = [
  {
    id: 1,
    title: 'Crying Detected',
    message: 'Oliver has been crying for 2 minutes in Preschool Room B',
    time: '2 mins ago',
    child: 'Oliver Johnson',
    type: 'alert',
    read: false,
  },
  {
    id: 2,
    title: 'Snack Time',
    message: 'Emma enjoyed her afternoon snack - apple slices and crackers',
    time: '1 hour ago',
    child: 'Emma Johnson',
    type: 'info',
    read: false,
  },
  {
    id: 3,
    title: 'Check-in Successful',
    message: 'Emma was checked in at 8:00 AM by Ms. Rodriguez',
    time: '3 hours ago',
    child: 'Emma Johnson',
    type: 'success',
    read: true,
  },
  {
    id: 4,
    title: 'Temperature Alert',
    message: 'Room temperature slightly elevated - staff adjusting AC',
    time: 'Yesterday',
    child: 'Emma Johnson',
    type: 'warning',
    read: true,
  },
  {
    id: 5,
    title: 'Activity Update',
    message: 'Oliver participated in painting class today',
    time: 'Yesterday',
    child: 'Oliver Johnson',
    type: 'info',
    read: true,
  },
];

export default function NotificationsCenterScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['#3B82F6', '#14B8A6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            {/* Back Arrow */}
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          
          <View style={styles.headerFooter}>
            <Text style={styles.unreadCount}>2 unread notifications</Text>
            <TouchableOpacity>
              <Text style={styles.markReadText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.cardWrapper}>
            {/* Colored Left Strip */}
            <View 
              style={[
                styles.leftStrip, 
                notification.type === 'alert' && { backgroundColor: '#EF4444' },
                notification.type === 'info' && { backgroundColor: '#3B82F6' },
                notification.type === 'success' && { backgroundColor: '#10B981' },
                notification.type === 'warning' && { backgroundColor: '#F59E0B' },
              ]} 
            />
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                {/* Icon */}
                <View 
                  style={[
                    styles.iconContainer,
                    notification.type === 'alert' && { backgroundColor: '#FEE2E2' },
                    notification.type === 'info' && { backgroundColor: '#DBEAFE' },
                    notification.type === 'success' && { backgroundColor: '#D1FAE5' },
                    notification.type === 'warning' && { backgroundColor: '#FEF3C7' },
                  ]}
                >
                  <Ionicons 
                    name={
                      notification.type === 'alert' ? 'alert-circle-outline' :
                      notification.type === 'info' ? 'information-circle-outline' :
                      notification.type === 'success' ? 'checkmark-circle-outline' : 'warning-outline'
                    }
                    size={24}
                    color={
                      notification.type === 'alert' ? '#EF4444' :
                      notification.type === 'info' ? '#3B82F6' :
                      notification.type === 'success' ? '#10B981' : '#F59E0B'
                    }
                  />
                </View>
                
                {/* Text Content */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={styles.cardTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.cardMessage}>{notification.message}</Text>
                  
                  {/* Meta Info */}
                  <View style={styles.cardFooter}>
                    <Ionicons name="time-outline" size={12} color="#6B7280" />
                    <Text style={styles.cardTime}>{notification.time}</Text>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.cardChild}>{notification.child}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Increased bottom padding for larger header look
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
    marginLeft: -4, // Align with left edge
  },
  headerTitleContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadCount: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  markReadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  leftStrip: {
    width: 4,
  },
  card: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  bullet: {
    color: '#9CA3AF',
    marginHorizontal: 4,
    fontSize: 12,
  },
  cardChild: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
