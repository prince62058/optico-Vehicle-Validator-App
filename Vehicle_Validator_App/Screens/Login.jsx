import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../services/api';

const Login = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle Login and Signup logic
  const handleAuth = async () => {
    const { name, mobile, email, password } = formData;

    // Validation
    if (!mobile || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobile,
            password,
            role: 'guard',
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');

        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('userInfo', JSON.stringify(data));

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'BottomTabs',
                params: { userRole: data.role },
              },
            ],
          });
        } else {
          Alert.alert('Error', 'No token received');
        }
      } else {
        // --- SIGNUP FLOW ---
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            mobile,
            email,
            password,
            role: 'guard',
          }),
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || 'Registration failed');

        Alert.alert('Success', 'Account created! Please login.', [
          {
            text: 'OK',
            onPress: () => {
              setIsLogin(true);
              setFormData(prev => ({ ...prev, password: '', name: '' }));
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert(isLogin ? 'Login Failed' : 'Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon name="shield-checkmark" size={80} color="#007AFF" />
              <View style={styles.logoIconOverlay}>
                <Icon
                  name="car-sport"
                  size={40}
                  color="white"
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    right: -10,
                    color: '#007AFF',
                  }}
                />
              </View>
            </View>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Login to continue' : 'Sign up to get started'}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.name}
                onChangeText={t => handleChange('name', t)}
              />
            )}

            {/* Mobile is required for both Login and Signup now */}
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={formData.mobile}
              onChangeText={t => handleChange('mobile', t)}
              keyboardType="phone-pad"
            />

            {/* Email is optional for signup, not used for login */}
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Email (Optional)"
                value={formData.email}
                onChangeText={t => handleChange('email', t)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={t => handleChange('password', t)}
              secureTextEntry
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleAuth}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setIsLogin(!isLogin)}
              style={({ pressed }) => [
                styles.toggleContainer,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </Text>
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={() => navigation.navigate('AdminLogin')}
              style={({ pressed }) => pressed && { opacity: 0.7 }}
            >
              <Text style={styles.adminLink}>Super Admin Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#666',
    fontSize: 14,
  },
  toggleLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#E3F2FD',
    borderRadius: 50,
  },
  logoIconOverlay: {
    position: 'absolute',
  },
  adminLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
