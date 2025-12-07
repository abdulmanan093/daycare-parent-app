import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const mockAlerts = [
  { id: 1, type: 'crying', text: 'Crying detected', time: '2 mins ago', severity: 'warning' },
  { id: 2, type: 'safe', text: 'Child is playing', time: '5 mins ago', severity: 'info' },
  { id: 3, type: 'movement', text: 'Active play detected', time: '10 mins ago', severity: 'info' },
];

export default function LiveMonitoringScreen({ navigation }: any) {
  const [isMuted, setIsMuted] = useState(false);
  const [selectedChild, setSelectedChild] = useState('Emma Johnson');

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#14B8A6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Live Monitoring</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          {/* Child Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.childSelector}
          >
            <TouchableOpacity
              style={[
                styles.childButton,
                selectedChild === 'Emma Johnson' && styles.childButtonActive,
              ]}
              onPress={() => setSelectedChild('Emma Johnson')}
            >
              <Text
                style={[
                  styles.childButtonText,
                  selectedChild === 'Emma Johnson' && styles.childButtonTextActive,
                ]}
              >
                Emma Johnson
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.childButton,
                selectedChild === 'Oliver Johnson' && styles.childButtonActive,
              ]}
              onPress={() => setSelectedChild('Oliver Johnson')}
            >
              <Text
                style={[
                  styles.childButtonText,
                  selectedChild === 'Oliver Johnson' && styles.childButtonTextActive,
                ]}
              >
                Oliver Johnson
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Live Video Feed */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544775928-01f4a1e3eba3?w=800' }}
            style={styles.videoFeed}
          />

          {/* Video Overlay */}
          <View style={styles.videoOverlay}>
            <View style={styles.videoHeader}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveIndicatorDot} />
                <Text style={styles.liveIndicatorText}>Live</Text>
              </View>
              <View style={styles.videoControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => setIsMuted(!isMuted)}
                >
                  <Ionicons
                    name={isMuted ? 'volume-mute' : 'volume-high'}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="expand" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.videoFooter}>
              <View style={styles.videoInfo}>
                <Ionicons name="time-outline" size={16} color="#fff" />
                <Text style={styles.videoInfoText}>{new Date().toLocaleTimeString()}</Text>
                <Text style={styles.videoInfoText}>•</Text>
                <Text style={styles.videoInfoText}>Toddler Room A</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="checkmark" size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>All Clear</Text>
            <Text style={styles.statusText}>Your child is safe and playing</Text>
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.alertsCard}>
          <Text style={styles.alertsTitle}>Recent Alerts</Text>
          {mockAlerts.map((alert) => (
            <View
              key={alert.id}
              style={[
                styles.alertItem,
                alert.severity === 'warning'
                  ? styles.alertWarning
                  : styles.alertInfo,
              ]}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color={alert.severity === 'warning' ? '#F59E0B' : '#3B82F6'}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.alertText,
                    {
                      color: alert.severity === 'warning' ? '#92400E' : '#1E40AF',
                    },
                  ]}
                >
                  {alert.text}
                </Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  childSelector: {
    gap: 8,
  },
  childButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  childButtonActive: {
    backgroundColor: '#fff',
  },
  childButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  childButtonTextActive: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  videoFeed: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveIndicatorText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
  videoControls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoFooter: {
    padding: 16,
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  videoInfoText: {
    fontSize: 13,
    color: '#fff',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
  },
  statusText: {
    fontSize: 14,
    color: '#047857',
    marginTop: 2,
  },
  alertsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertWarning: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  alertInfo: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  alertText: {
    fontSize: 14,
    fontWeight: '500',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
