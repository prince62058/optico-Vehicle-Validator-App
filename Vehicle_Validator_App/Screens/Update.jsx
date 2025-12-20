import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

const Update = ({ route, navigation }) => {
  const [searchId, setSearchId] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);

  // If passed from VehicleDetails
  useEffect(() => {
    if (route.params?.vehicleId) {
      setSearchId(route.params.vehicleId);
      fetchVehicleIfNeeded(route.params.vehicleId);
    }
  }, [route.params]);

  const fetchVehicleIfNeeded = async id => {
    if (!id) return;
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = await response.json();
      if (response.ok) setVehicleData(data);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch vehicle details');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const headers = { Authorization: token ? `Bearer ${token}` : '' };

      const response = await fetch(
        `${BASE_URL}/vehicles/search?query=${searchId}`,
        { headers },
      );
      const result = await response.json();

      if (Array.isArray(result) && result.length > 0) {
        setVehicleData(result[0]);
      } else if (result && typeof result === 'object' && !result.message) {
        setVehicleData(result);
      } else {
        // Fallback logic if search/query param fails or is different
        if (/^[0-9a-fA-F]{24}$/.test(searchId)) {
          const directResponse = await fetch(
            `${BASE_URL}/vehicles/${searchId}`,
            { headers },
          );
          const directData = await directResponse.json();
          if (directResponse.ok) setVehicleData(directData);
          else throw new Error('Not found');
        } else {
          throw new Error('Not found');
        }
      }
    } catch (error) {
      Alert.alert('Not Found', 'No vehicle found.');
      setVehicleData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!vehicleData) return;
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/vehicles/${vehicleData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(vehicleData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Update failed');

      Alert.alert('Success', 'Vehicle updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Update Vehicle</Text>

        {/* Update Form */}
        {vehicleData && (
          <View style={styles.form}>
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.vehicleNumber}
              onChangeText={t => handleChange('vehicleNumber', t)}
            />

            <Text style={styles.label}>Pass Number</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.passNumber}
              onChangeText={t => handleChange('passNumber', t)}
            />

            <Text style={styles.label}>Flat Number</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.flatNumber}
              onChangeText={t => handleChange('flatNumber', t)}
            />

            <Text style={styles.label}>Owner Name</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.ownerName}
              onChangeText={t => handleChange('ownerName', t)}
            />

            <Text style={styles.label}>Owner Contact</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.ownerContact}
              onChangeText={t => handleChange('ownerContact', t)}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Alternate Contact</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.alternateContact}
              onChangeText={t => handleChange('alternateContact', t)}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.email}
              onChangeText={t => handleChange('email', t)}
              keyboardType="email-address"
            />

            <Text style={styles.label}>DL / RC</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.dlOrRcNumber}
              onChangeText={t => handleChange('dlOrRcNumber', t)}
            />

            <Text style={styles.label}>Flat Owner Name</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.flatOwnerName}
              onChangeText={t => handleChange('flatOwnerName', t)}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              value={vehicleData.permanentAddress}
              onChangeText={t => handleChange('permanentAddress', t)}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Valid Till</Text>
            <TextInput
              style={styles.input}
              value={
                vehicleData.validTill ? vehicleData.validTill.split('T')[0] : ''
              }
              onChangeText={t => handleChange('validTill', t)}
              placeholder="YYYY-MM-DD"
            />

            <Pressable
              style={({ pressed }) => [
                styles.updateButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Updating...' : 'Save Changes'}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 10,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
