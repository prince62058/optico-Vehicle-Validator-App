import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

const AddVehicle = ({ navigation }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: '', // required, unique
    passNumber: '', // required, unique
    flatNumber: '', // required
    ownerName: '', // required
    dlOrRcNumber: '',
    ownerContact: '', // required
    alternateContact: '',
    email: '',
    permanentAddress: '',
    flatOwnerName: '',
    validTill: new Date().toISOString().split('T')[0], // Default to today, or should be future?
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    const { vehicleNumber, passNumber, flatNumber, ownerName, ownerContact } =
      formData;
    if (
      !vehicleNumber ||
      !passNumber ||
      !flatNumber ||
      !ownerName ||
      !ownerContact
    ) {
      Alert.alert('Error', 'Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to add vehicle');

      Alert.alert('Success', 'Vehicle added successfully', [
        {
          text: 'OK',
          onPress: () => {
            setFormData({
              vehicleNumber: '',
              passNumber: '',
              flatNumber: '',
              ownerName: '',
              dlOrRcNumber: '',
              ownerContact: '',
              alternateContact: '',
              email: '',
              permanentAddress: '',
              flatOwnerName: '',
              validTill: new Date().toISOString().split('T')[0],
            });
            navigation.navigate('Display'); // Or go back to Home
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Add New Vehicle</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Vehicle Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. DL8CAB1234"
            value={formData.vehicleNumber}
            onChangeText={text => handleChange('vehicleNumber', text)}
          />

          <Text style={styles.label}>Pass Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. PASS-001"
            value={formData.passNumber}
            onChangeText={text => handleChange('passNumber', text)}
          />

          <Text style={styles.label}>Flat Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. B-404"
            value={formData.flatNumber}
            onChangeText={text => handleChange('flatNumber', text)}
          />

          <Text style={styles.label}>Owner Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Rahul Sharma"
            value={formData.ownerName}
            onChangeText={text => handleChange('ownerName', text)}
          />

          <Text style={styles.label}>Owner Contact *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9876543210"
            value={formData.ownerContact}
            onChangeText={text => handleChange('ownerContact', text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Alternate Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9123456789"
            value={formData.alternateContact}
            onChangeText={text => handleChange('alternateContact', text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
          />

          <Text style={styles.label}>DL / RC Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. RC-XYZ-12345"
            value={formData.dlOrRcNumber}
            onChangeText={text => handleChange('dlOrRcNumber', text)}
          />

          <Text style={styles.label}>Flat Owner Name (if different)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Self"
            value={formData.flatOwnerName}
            onChangeText={text => handleChange('flatOwnerName', text)}
          />

          <Text style={styles.label}>Permanent Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter address..."
            multiline
            numberOfLines={3}
            value={formData.permanentAddress}
            onChangeText={text => handleChange('permanentAddress', text)}
          />

          <Text style={styles.label}>Valid Till (YYYY-MM-DD) *</Text>
          <TextInput
            style={styles.input}
            placeholder="2025-12-31"
            value={formData.validTill}
            onChangeText={text => handleChange('validTill', text)}
          />

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Adding...' : 'Add Vehicle'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#444',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
