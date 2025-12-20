import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import VehicleNavigator from './Navigations/VehicleNaviagtor';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);



  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <VehicleNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});