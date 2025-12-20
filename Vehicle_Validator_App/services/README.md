# API Configuration Guide

## Overview
This app uses a centralized API configuration file located at `services/api.js`. This makes it easy to switch between development (localhost) and production (Render) environments.

## Current Configuration

### Production URL (Render)
```
https://vechile-validator-backend.onrender.com/api
```

### Development URL (Localhost)
```
http://localhost:5001/api (iOS Simulator)
http://10.0.2.2:5001/api (Android Emulator)
```

## How to Switch Between Environments

Open `services/api.js` and change the `USE_PRODUCTION` flag:

### For Production (Render Backend)
```javascript
const USE_PRODUCTION = true;
```

### For Development (Local Backend)
```javascript
const USE_PRODUCTION = false;
```

## Files Updated
All API calls in the following screens now use the centralized configuration:
- ✅ Login.jsx
- ✅ AdminLogin.jsx
- ✅ Home.jsx
- ✅ AddVehicle.jsx
- ✅ VehicleDetails.jsx
- ✅ Update.jsx
- ✅ Admin.jsx
- ✅ Display.jsx

## Important Notes
1. **Android Emulator**: Uses `10.0.2.2` instead of `localhost` to access the host machine
2. **iOS Simulator**: Can use `localhost` directly
3. **Production**: Always uses the Render URL regardless of platform

## Testing
After changing the environment:
1. Stop the React Native app
2. Restart with `npm run android` or `npm run ios`
3. The app will now use the selected backend
