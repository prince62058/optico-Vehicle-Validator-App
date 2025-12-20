import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../services/api';

const Display = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/vehicles`, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVehicles(data);
      }
    } catch (error) {
      console.log('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchVehicles();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVehicles();
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
      onPress={() =>
        navigation.navigate('VehicleDetails', { vehicleId: item._id })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.vehicleNumber}>
          {item.vehicleNumber || item.registrationNumber}
        </Text>
        <Text style={styles.vehicleType}>{item.vehicleType}</Text>
      </View>
      <Text style={styles.ownerName}>Owner: {item.ownerName}</Text>
      <Text style={styles.details}>Tap to view details</Text>
    </Pressable>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>All Vehicles</Text>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={item => item._id || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No vehicles found.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'white',
    color: '#000',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vehicleType: {
    fontSize: 14,
    color: '#888',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  ownerName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
    fontSize: 16,
  },
});
