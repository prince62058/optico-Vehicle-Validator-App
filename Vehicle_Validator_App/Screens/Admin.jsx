import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/api';

const Admin = ({ navigation }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Register Form Data
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin', // Default role
  });

  // Fetch list of admin staff from backend when component loads
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Function to get all admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/admins`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAdmins(data);
      }
    } catch (error) {
      console.log('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function: Clears session and redirects to Login
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    // Using replace to prevent going back to Admin screen
    navigation.replace('Login');
  };

  // Delete an admin staff member
  const handleDelete = async id => {
    Alert.alert('Delete Staff', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${BASE_URL}/admins/${id}`, {
              method: 'DELETE',
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            });

            if (response.ok) {
              fetchAdmins(); // Refresh list after deleting
            } else {
              throw new Error('Failed');
            }
          } catch (e) {
            Alert.alert('Error', 'Failed to delete');
          }
        },
      },
    ]);
  };

  // Register a new admin staff member
  const handleRegister = async () => {
    if (!newAdmin.email || !newAdmin.password || !newAdmin.username) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      Alert.alert('Success', 'New staff registered');
      setModalVisible(false); // Close modal
      setNewAdmin({ username: '', email: '', password: '', role: 'admin' }); // Reset form
      fetchAdmins(); // Refresh list
    } catch (e) {
      Alert.alert('Registration Failed', e.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.username || item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <Pressable
        onPress={() => handleDelete(item._id)}
        style={({ pressed }) => pressed && { opacity: 0.7 }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.8 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Staff</Text>
      </Pressable>

      <FlatList
        data={admins}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshing={loading}
        onRefresh={fetchAdmins}
        contentContainerStyle={styles.list}
      />

      {/* Add Admin Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register New Staff</Text>

            <TextInput
              placeholder="Username"
              style={styles.input}
              value={newAdmin.username}
              onChangeText={t => setNewAdmin({ ...newAdmin, username: t })}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={newAdmin.email}
              onChangeText={t => setNewAdmin({ ...newAdmin, email: t })}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={newAdmin.password}
              onChangeText={t => setNewAdmin({ ...newAdmin, password: t })}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalBtn,
                  styles.cancelBtn,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalBtn,
                  styles.saveBtn,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleRegister}
              >
                <Text style={styles.modalBtnText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutText: {
    color: 'red',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    color: '#666',
    fontSize: 14,
  },
  role: {
    color: '#007AFF',
    fontSize: 12,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  deleteText: {
    color: 'red',
    fontWeight: '600',
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: '#999',
  },
  saveBtn: {
    backgroundColor: '#34C759',
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
