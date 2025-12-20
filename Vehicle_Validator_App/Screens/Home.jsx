import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle user logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    // Navigate back to Login screen and reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Search vehicle by number
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      // Get authentication token
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      };

      const response = await fetch(
        `${BASE_URL}/vehicles/search?query=${searchQuery}`,
        {
          method: 'GET',
          headers,
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Search failed');

      // The backend returns a single object if found.
      // We wrap it in an array to display in a list (FlatList).
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else if (data && typeof data === 'object') {
        setSearchResults([data]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      // Clear results if not found or error occurs
      setSearchResults([]);
      console.log('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove a specific search result from the list
  const handleRemoveItem = id => {
    setSearchResults(prev => prev.filter(item => item._id !== id));
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
      onPress={() =>
        navigation.navigate('VehicleDetails', { vehicleId: item._id })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {item.vehicleNumber || item.registrationNumber}
        </Text>
        <Pressable
          onPress={e => {
            e.stopPropagation(); // Prevent card press
            handleRemoveItem(item._id);
          }}
          style={({ pressed }) => [
            styles.closeCardInfo,
            pressed && { opacity: 0.5 },
          ]}
          hitSlop={10}
        >
          <Icon name="close" size={20} color="white" />
        </Pressable>
      </View>
      <Text style={styles.cardSubtitle}>Owner: {item.ownerName}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Checkpoint</Text>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <Icon name="log-out-outline" size={24} color="white" />
        </Pressable>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Vehicle Number"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              style={({ pressed }) => [
                styles.clearButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Icon name="close-circle" size={20} color="#999" />
            </Pressable>
          )}
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      {/* Quick Stats or Recent Results */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => item._id || Math.random().toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No vehicles found</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 5,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    // Remove individual border styles as wrapper handles it
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeCardInfo: {
    padding: 5,
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
