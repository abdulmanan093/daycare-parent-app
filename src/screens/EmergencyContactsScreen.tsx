import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const keyPersonnel = [
  { 
    id: 1, 
    name: 'Jennifer Martinez', 
    role: 'Center Director', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' 
  },
  { 
    id: 2, 
    name: 'Emily Davis', 
    role: 'On-site Nurse', 
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400' 
  },
];

const roomTeachers = [
  { 
    id: 3, 
    name: 'Ms. Sarah', 
    role: 'Toddler Room A', 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' 
  },
  { 
    id: 4, 
    name: 'Mr. David', 
    role: 'Preschool Room B', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' 
  },
];

export default function EmergencyContactsScreen({ navigation }: any) {
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      {/* Orange-Red Gradient Header */}
      <LinearGradient
        colors={['#FF4B1F', '#FF9068']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Emergency Contacts</Text>
            <Text style={styles.headerSubtitle}>Quick access to important contacts</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Services Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <View style={styles.emergencyIconContainer}>
              <Ionicons name="alert-circle-outline" size={32} color="#fff" />
            </View>
            <View>
              <Text style={styles.emergencyTitle}>Emergency Services</Text>
              <Text style={styles.emergencySubtitle}>For life-threatening emergencies</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.call911Button}
            onPress={() => handleCall('911')}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.call911Text}>Call 911</Text>
          </TouchableOpacity>
        </View>

        {/* Key Personnel */}
        <Text style={styles.sectionTitle}>Key Personnel</Text>
        <View style={styles.listContainer}>
          {keyPersonnel.map((person) => (
            <View key={person.id} style={styles.personCard}>
              <Image source={{ uri: person.image }} style={styles.avatar} />
              <View style={styles.personInfo}>
                <Text style={styles.personName}>{person.name}</Text>
                <Text style={styles.personRole}>{person.role}</Text>
              </View>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => handleCall('555-123-4567')}
              >
                <Ionicons name="call-outline" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Room Teachers */}
        <Text style={styles.sectionTitle}>Room Teachers</Text>
        <View style={styles.listContainer}>
          {roomTeachers.map((teacher) => (
            <View key={teacher.id} style={styles.personCard}>
              <Image source={{ uri: teacher.image }} style={styles.avatar} />
              <View style={styles.personInfo}>
                <Text style={styles.personName}>{teacher.name}</Text>
                <Text style={styles.personRole}>{teacher.role}</Text>
              </View>
              <TouchableOpacity 
                style={styles.callButton}
                 onPress={() => handleCall('555-987-6543')}
              >
                <Ionicons name="call-outline" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
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
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    width: 40,
  },
  headerContent: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20, // Overlap effect if desired, but stick to clean layout for now
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 24,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  emergencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#991B1B',
  },
  emergencySubtitle: {
    fontSize: 13,
    color: '#DC2626',
    marginTop: 2,
    maxWidth: 200,
  },
  call911Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
  },
  call911Text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 8,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  personInfo: {
    flex: 1,
    marginLeft: 16,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  personRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  callButton: {
    padding: 8,
  },
});
