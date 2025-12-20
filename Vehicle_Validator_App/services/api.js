import { Platform } from 'react-native';

// Production URL (Render deployment)
const PRODUCTION_URL = 'https://vechile-validator-backend.onrender.com/api';

// Development URL (Local server)
const DEVELOPMENT_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5001/api' // Android emulator
    : 'http://localhost:5001/api'; // iOS simulator

// Toggle between production and development
// Set to true for production, false for development
const USE_PRODUCTION = true;

// Export the base URL
export const BASE_URL = USE_PRODUCTION ? PRODUCTION_URL : DEVELOPMENT_URL;

// Helper function to get full API endpoint
export const getApiUrl = endpoint => {
  return `${BASE_URL}${endpoint}`;
};

// Export individual URLs for easy switching
export const API_CONFIG = {
  production: PRODUCTION_URL,
  development: DEVELOPMENT_URL,
  current: BASE_URL,
};
