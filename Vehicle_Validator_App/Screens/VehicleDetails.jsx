import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

const VehicleDetails = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    fetchDetails();
    checkPermission();
  }, [vehicleId]);

  // Check if current user has permission to edit/delete (Admin/SuperAdmin)
  const checkPermission = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const user = JSON.parse(userInfo);
        // Enable buttons if SuperAdmin or Admin
        if (user.role === 'superadmin' || user.role === 'admin') {
          setCanEdit(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch specific vehicle details from backend
  const fetchDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch details');

      setVehicle(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      navigation.goBack(); // Return to previous screen if error
    } finally {
      setLoading(false);
    }
  };

  // Handle vehicle deletion confirmation
  const handleDelete = async () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const response = await fetch(
                `${BASE_URL}/vehicles/${vehicleId}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                  },
                },
              );

              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete');
              }

              navigation.navigate('Display'); // Go back to list after delete
            } catch (error) {
              Alert.alert('Error', 'Failed to delete vehicle');
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!vehicle) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>{vehicle.vehicleNumber}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Pass Number:</Text>
            <Text style={styles.value}>{vehicle.passNumber}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Flat Number:</Text>
            <Text style={styles.value}>{vehicle.flatNumber}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Owner Name:</Text>
            <Text style={styles.value}>{vehicle.ownerName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Owner Contact:</Text>
            <Text style={styles.value}>{vehicle.ownerContact}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Alternate Contact:</Text>
            <Text style={styles.value}>
              {vehicle.alternateContact || 'N/A'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{vehicle.email || 'N/A'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>DL / RC:</Text>
            <Text style={styles.value}>{vehicle.dlOrRcNumber || 'N/A'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Flat Owner:</Text>
            <Text style={styles.value}>{vehicle.flatOwnerName || 'Self'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {vehicle.permanentAddress || 'N/A'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Valid Till:</Text>
            <Text style={[styles.value, { color: '#FF9500' }]}>
              {vehicle.validTill
                ? new Date(vehicle.validTill).toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {canEdit && (
            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete Vehicle</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F2F2F7',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButtons: {
    marginTop: 10,
    paddingBottom: 40,
  },
  updateButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
