import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your screen components
import Home from '../Screens/Home';
import AddVehicle from '../Screens/AddVehicle';
import Display from '../Screens/Display';
import Update from '../Screens/Update';
import Admin from '../Screens/Admin';
import VehicleDetails from '../Screens/VehicleDetails'; // Example detail screen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack Navigator
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{
          headerShown: true,
          title: 'Vehicle Details',
        }}
      />
    </Stack.Navigator>
  );
};

// Display Stack Navigator
const DisplayStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DisplayMain" component={Display} />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{
          headerShown: true,
          title: 'Vehicle Details',
        }}
      />
    </Stack.Navigator>
  );
};

// Update Stack Navigator
const UpdateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UpdateMain" component={Update} />
    </Stack.Navigator>
  );
};

// Admin Stack Navigator
const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminMain" component={Admin} />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddVehicle') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Display') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Update') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{
          tabBarLabel: 'Add',
        }}
      />
      <Tab.Screen
        name="Display"
        component={DisplayStack}
        options={{
          tabBarLabel: 'Display',
        }}
      />
      <Tab.Screen
        name="Update"
        component={UpdateStack}
        options={{
          tabBarLabel: 'Update',
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminStack}
        options={{
          tabBarLabel: 'Admin',
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const VehicleNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={MyTabs} />
      {/* Add any modal screens here */}
      <Stack.Screen
        name="VehicleForm"
        component={AddVehicle}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerShown: true,
          title: 'Add New Vehicle',
        }}
      />
    </Stack.Navigator>
  );
};

export default VehicleNavigator;

const styles = StyleSheet.create({});