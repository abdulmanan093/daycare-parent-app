import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const attendanceData = [
  { day: 'Mon', height: 120 },
  { day: 'Tue', height: 110 },
  { day: 'Wed', height: 125 },
  { day: 'Thu', height: 90 },
  { day: 'Fri', height: 125 },
];

const safetyEvents = [
  { id: 1, title: 'Unknown person alert', time: 'Nov 11 • 2:30 PM', color: '#F87171', bg: '#FEF2F2' },
  { id: 2, title: 'Crying detected', time: 'Nov 10 • 10:15 AM', color: '#FBBF24', bg: '#FFFBEB' },
  { id: 3, title: 'All clear', time: 'Nov 9 • All day', color: '#34D399', bg: '#ECFDF5' },
  { id: 4, title: 'Temperature warning', time: 'Nov 8 • 3:45 PM', color: '#FBBF24', bg: '#FFFBEB' },
];

export default function ReportsScreen({ navigation }: any) {
  const [selectedChild, setSelectedChild] = useState('Emma Johnson');
  const [timeRange, setTimeRange] = useState('This Week');

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
            <Text style={styles.headerTitle}>Reports & Analytics</Text>
            <TouchableOpacity style={styles.exportButton}>
              <Ionicons name="download-outline" size={18} color="#fff" />
              <Text style={styles.exportText}>Export PDF</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.childSelector}>
            <TouchableOpacity 
              style={[styles.childPill, selectedChild === 'Emma Johnson' && styles.childPillActive]}
              onPress={() => setSelectedChild('Emma Johnson')}
            >
              <Text style={[styles.childPillText, selectedChild === 'Emma Johnson' && styles.childPillTextActive]}>
                Emma Johnson
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.childPill, selectedChild === 'Oliver Johnson' && styles.childPillActive]}
              onPress={() => setSelectedChild('Oliver Johnson')}
            >
              <Text style={[styles.childPillText, selectedChild === 'Oliver Johnson' && styles.childPillTextActive]}>
                Oliver Johnson
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Time Range Selector */}
        <View style={styles.rangeSelector}>
          <TouchableOpacity 
            style={[styles.rangeButton, timeRange === 'This Week' && styles.rangeButtonActive]}
            onPress={() => setTimeRange('This Week')}
          >
            <Text style={[styles.rangeText, timeRange === 'This Week' && styles.rangeTextActive]}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.rangeButton, timeRange === 'This Month' && styles.rangeButtonActive]}
            onPress={() => setTimeRange('This Month')}
          >
            <Text style={[styles.rangeText, timeRange === 'This Month' && styles.rangeTextActive]}>This Month</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Rows */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="time-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.metricLabel}>Total Hours</Text>
            <Text style={styles.metricValue}>37.5 hrs</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="trending-up" size={24} color="#9333EA" />
            </View>
            <Text style={styles.metricLabel}>Activity Level</Text>
            <Text style={styles.metricValue}>High</Text>
          </View>
        </View>
        
        <View style={styles.alertMetricCard}>
          <View style={[styles.metricIcon, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="alert-circle-outline" size={24} color="#D97706" />
          </View>
          <View>
            <Text style={styles.metricLabel}>Alerts</Text>
            <Text style={styles.metricValue}>2 events</Text>
          </View>
        </View>

        {/* Daily Attendance Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Daily Attendance</Text>
          <View style={styles.chartContainer}>
            {attendanceData.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: item.height }]} />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Events */}
        <View style={styles.eventsCard}>
          <Text style={styles.cardTitle}>Safety Events</Text>
          {safetyEvents.map((event) => (
            <View key={event.id} style={[styles.eventRow, { backgroundColor: event.bg }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.eventTitle, { color: '#4B5563' }]}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
              <View style={[styles.eventDot, { backgroundColor: event.color }]} />
            </View>
          ))}
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <LinearGradient
            colors={['#3B82F6', '#14B8A6']}
            style={styles.downloadGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="download-outline" size={20} color="#fff" />
            <Text style={styles.downloadText}>Download Full Report (PDF)</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exportText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  childSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  childPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  childPillActive: {
    backgroundColor: '#fff',
  },
  childPillText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  childPillTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  rangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  rangeButtonActive: {
    backgroundColor: '#2563EB',
  },
  rangeText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  rangeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
  },
  alertMetricCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barContainer: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 32,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  downloadButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  downloadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
