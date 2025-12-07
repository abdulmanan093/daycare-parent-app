import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const children = [
  {
    id: 1,
    name: 'Emma Johnson',
    age: 4,
    room: 'Preschool A',
    status: 'safe',
    statusText: 'Playing safely',
    lastUpdate: '2 mins ago',
    thumbnail: 'https://images.unsplash.com/photo-1550290129-443a64c3ff25?w=400',
  },
  {
    id: 2,
    name: 'Oliver Johnson',
    age: 3,
    room: 'Toddler B',
    status: 'alert',
    statusText: 'Crying detected',
    lastUpdate: 'Just now',
    thumbnail: 'https://images.unsplash.com/photo-1633322007934-4e0dd1213397?w=400',
  },
];

export default function DashboardScreen({ navigation }: any) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'safe' ? '#10B981' : '#EF4444';
  };

  const getStatusBgColor = (status: string) => {
    return status === 'safe' ? '#D1FAE5' : '#FEE2E2';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#14B8A6']}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>Sarah Johnson</Text>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={26} color="#fff" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Active Children</Text>
              <Text style={styles.statusValue}>{children.length} Children</Text>
            </View>
            <View style={styles.statusDivider} />
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>All Status</Text>
              <Text style={styles.statusValue}>1 Alert</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Children Cards */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {children.map((child, index) => (
          <View key={child.id} style={styles.childCard}>
            {/* Child Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: child.thumbnail }}
                style={styles.childImage}
              />
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(child.status) },
                ]}
              >
                <Text style={[styles.statusBadgeText, { color: getStatusColor(child.status) }]}>
                  {child.status === 'safe' ? '✓ Safe' : '⚠ Alert'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => navigation.navigate('Live')}
              >
                <Ionicons name="play" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            {/* Child Info */}
            <View style={styles.childInfo}>
              <View style={styles.childHeader}>
                <View>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childDetails}>
                    {child.age} years • {child.room}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChildProfile', {
                      childId: child.id,
                      childName: child.name,
                    })
                  }
                >
                  <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Status Info */}
              <View
                style={[
                  styles.statusInfo,
                  { backgroundColor: getStatusBgColor(child.status) },
                ]}
              >
                {child.status === 'alert' && (
                  <Ionicons name="alert-circle" size={18} color={getStatusColor(child.status)} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.statusText, { color: getStatusColor(child.status) }]}>
                    {child.statusText}
                  </Text>
                  <Text style={styles.lastUpdate}>{child.lastUpdate}</Text>
                </View>
              </View>

              {/* Quick Actions */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Live')}
                >
                  <Ionicons name="eye-outline" size={18} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>View Live</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Reports')}
                >
                  <Ionicons name="document-text-outline" size={18} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>View Reports</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Safety Tip */}
        <LinearGradient
          colors={['#14B8A6', '#10B981']}
          style={styles.tipCard}
        >
          <Text style={styles.tipTitle}>💡 Safety Tip</Text>
          <Text style={styles.tipText}>
            Enable instant notifications to receive real-time alerts about your child's
            activities and safety status.
          </Text>
        </LinearGradient>
      </ScrollView>

      {/* Floating Emergency Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => navigation.navigate('Emergency')}
      >
        <Ionicons name="alert-circle" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#E0F2FE',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  statusCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 13,
    color: '#E0F2FE',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  childCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  childImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  childInfo: {
    padding: 20,
  },
  childHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  childDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  tipCard: {
    padding: 20,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#D1FAE5',
    lineHeight: 20,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
