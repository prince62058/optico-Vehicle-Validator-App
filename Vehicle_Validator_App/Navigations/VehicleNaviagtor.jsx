import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screen components
import Login from '../Screens/Login';
import AdminLogin from '../Screens/AdminLogin';
import Home from '../Screens/Home';
import AddVehicle from '../Screens/AddVehicle';
import Update from '../Screens/Update';
import Display from '../Screens/Display';
import VehicleDetails from '../Screens/VehicleDetails';
import Admin from '../Screens/Admin';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ...

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
      <Stack.Screen
        name="Update"
        component={Update}
        options={{
          headerShown: true,
          title: 'Update Vehicle',
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
      <Stack.Screen
        name="Update"
        component={Update}
        options={{
          headerShown: true,
          title: 'Update Vehicle',
        }}
      />
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
const MyTabs = ({ route }) => {
  const { userRole } = route.params || {}; // Get role from params

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

      {(userRole === 'superadmin' || userRole === 'admin') && (
        <Tab.Screen
          name="AddVehicle"
          component={AddVehicle}
          options={{
            tabBarLabel: 'Add',
          }}
        />
      )}

      <Tab.Screen
        name="Display"
        component={DisplayStack}
        options={{
          tabBarLabel: 'Display',
        }}
      />

      {(userRole === 'superadmin' || userRole === 'admin') && (
        <Tab.Screen
          name="Admin"
          component={AdminStack}
          options={{
            tabBarLabel: 'Admin',
          }}
        />
      )}
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const VehicleNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfo = await AsyncStorage.getItem('userInfo');

        if (token && userInfo) {
          const user = JSON.parse(userInfo);
          setUserRole(user.role);
          setInitialRoute('BottomTabs');
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        setInitialRoute('Login');
      }
    };
    checkToken();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen
        name="BottomTabs"
        component={MyTabs}
        initialParams={{ userRole }} // Pass role as initial param
      />
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
