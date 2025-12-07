import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChildProfileScreen({ route, navigation }: any) {
  const { childId, childName } = route.params || { childId: 1, childName: 'Emma Johnson' };
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // States for editable fields
  const [height, setHeight] = useState('3\'2"');
  const [weight, setWeight] = useState('32 lbs');
  
  // Medical/Allergy Edit State
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState('• Peanut allergy (severe)\n• Lactose intolerant');

  const handleSaveMedical = () => {
    setIsEditingMedical(false);
    // Ideally save to backend here
  };

  const handleSaveHealth = () => {
    setIsEditing(false);
    // Ideally save to backend here
  };

  // Mock child data
  const child = {
    id: childId,
    name: childName === 'Emma Johnson' ? childName : 'Oliver Johnson',
    age: 3,
    room: 'Toddler B',
    status: 'alert',
    photo: 'https://images.unsplash.com/photo-1633322007934-4e0dd1213397?w=400',
    allergies: [], 
    emergencyContacts: [
      { name: 'Sarah Johnson', relation: 'Mother', phone: '+1 (555) 123-4567' },
      { name: 'Michael Johnson', relation: 'Father', phone: '+1 (555) 123-4568' },
    ],
    healthInfo: {
      height: height,
      weight: weight,
    },
  };

  const getStatusColor = (status: string) => {
    return status === 'safe' ? '#10B981' : '#EF4444';
  };

  const getStatusBg = (status: string) => {
    return status === 'safe' ? '#D1FAE5' : '#FEE2E2';
  };

  const getStatusText = (status: string) => {
    return status === 'safe' ? '✓ Safe' : '⚠ Alert';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      {/* Header with Photo */}
      <View style={styles.headerContainer}>
        <LinearGradient colors={['#3B82F6', '#14B8A6']} style={styles.headerGradient} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.photoContainer}>
          <Image source={{ uri: child.photo }} style={styles.photo} />
        </View>
        <Text style={styles.name}>{child.name}</Text>
        <Text style={styles.details}>
          {child.age} years • {child.room}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg(child.status) }]}>
          <Text style={[styles.statusBadgeText, { color: getStatusColor(child.status) }]}>
            {getStatusText(child.status)}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Live' })}
        >
          <Ionicons name="videocam" size={24} color="#3B82F6" />
          <Text style={styles.quickActionText}>Live Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Reports' })}
        >
          <Ionicons name="document-text" size={24} color="#3B82F6" />
          <Text style={styles.quickActionText}>Reports</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'health' && styles.tabActive]}
          onPress={() => setSelectedTab('health')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'health' && styles.tabTextActive]}
          >
            Health
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' ? (
          <View style={styles.tabContent}>
            {/* Basic Info */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Basic Information</Text>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>{child.age} years old</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color="#9CA3AF" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Room Assignment</Text>
                  <Text style={styles.infoValue}>{child.room}</Text>
                </View>
              </View>
            </View>

            {/* Emergency Contacts */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Emergency Contacts</Text>
              {child.emergencyContacts.map((contact, index) => (
                <View key={index} style={styles.contactRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  </View>
                  <TouchableOpacity style={styles.callButton}>
                    <Ionicons name="call" size={20} color="#3B82F6" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.tabContent}>
            {/* Health Info */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Health Information</Text>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                  <Ionicons
                    name={isEditing ? 'close' : 'create-outline'}
                    size={20}
                    color="#3B82F6"
                  />
                </TouchableOpacity>
              </View>
              
              {isEditing ? (
                 <View>
                   <View style={styles.healthRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoLabel}>Height</Text>
                      <TextInput 
                        style={styles.healthInput} 
                        value={height}
                        onChangeText={setHeight}
                      />
                    </View>
                  </View>
                  <View style={styles.healthRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoLabel}>Weight</Text>
                      <TextInput 
                        style={styles.healthInput} 
                        value={weight}
                        onChangeText={setWeight}
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveHealth}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                 </View>
              ) : (
                <View>
                  <View style={styles.healthRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoLabel}>Height</Text>
                      <Text style={styles.infoValue}>{child.healthInfo.height}</Text>
                    </View>
                  </View>
                  <View style={styles.healthRow}>
                    <View>
                      <Text style={styles.infoLabel}>Weight</Text>
                      <Text style={styles.infoValue}>{child.healthInfo.weight}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Allergies/Medical Info */}
            <View style={styles.medicalCard}>
              <View style={styles.medicalHeader}>
                <View style={styles.medicalTitleRow}>
                  <Ionicons name="warning" size={20} color="#EF4444" />
                  <Text style={styles.medicalTitle}>Allergies & Medical Info</Text>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditingMedical(!isEditingMedical)}
                >
                  <Ionicons name="create-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
              {isEditingMedical ? (
                <View>
                  <TextInput
                    style={styles.medicalInput}
                    value={medicalInfo}
                    onChangeText={setMedicalInfo}
                    multiline
                    numberOfLines={3}
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveMedical}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                   {medicalInfo.split('\n').map((line, i) => (
                      <Text key={i} style={styles.medicalText}>{line}</Text>
                   ))}
                   {!medicalInfo && <Text style={styles.medicalText}>None</Text>}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  headerGradient: {
    height: 150,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 0,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    zIndex: 10,
  },
  photoContainer: {
    marginTop: 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000ff',
    marginTop: 3,
  },
  details: {
    fontSize: 14,
    color: '#000000ff',
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 0,
    gap: 12,
    marginBottom: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactPhone: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  callButton: {
    padding: 8,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  healthInput: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  medicalCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  medicalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medicalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
  },
  editButton: {
    padding: 4,
  },
  medicalInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    textAlignVertical: 'top',
    height: 80,
  },
  medicalText: {
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 22,
  },
});
