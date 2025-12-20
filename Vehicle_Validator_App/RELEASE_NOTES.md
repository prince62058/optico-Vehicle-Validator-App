# Vehicle Validator App - Release v1.0

## 📱 Release Information

**Version**: 1.0  
**Version Code**: 1  
**Package Name**: com.vehicle_validator_app  
**Build Date**: December 20, 2025  
**Build Type**: Release APK  

## 📦 APK Details

**File Name**: `Vehicle-Validator-v1.0.apk`  
**File Size**: 66 MB  
**Location**: `/Users/princekumar/Desktop/Mobile_App/Vehicle_Validator_App/Vehicle-Validator-v1.0.apk`  

## ✨ Features

### User Features (Guard Role)
- ✅ User Registration & Login
- ✅ Vehicle Search by Number
- ✅ View Vehicle Details
- ✅ View All Registered Vehicles

### Admin Features (SuperAdmin Role)
- ✅ Admin Login
- ✅ Add New Vehicles
- ✅ Update Vehicle Information
- ✅ Delete Vehicles
- ✅ Manage Admin Staff
- ✅ View All Vehicles

### Technical Features
- ✅ Centralized API Configuration
- ✅ Production & Development Environment Support
- ✅ Secure Authentication with JWT
- ✅ AsyncStorage for Session Management
- ✅ Beautiful UI with React Native
- ✅ Splash Screen
- ✅ Custom App Icon

## 🌐 Backend Configuration

**Production URL**: `https://vechile-validator-backend.onrender.com/api`  
**Development URL**: `http://localhost:5001/api`  

Currently configured for **Production** mode.

## 📲 Installation Instructions

### For Testing on Android Device:
1. Transfer the APK file to your Android device
2. Enable "Install from Unknown Sources" in Settings
3. Tap on the APK file to install
4. Open the app and start using

### For Google Play Store:
1. Create a proper release keystore (not using debug keystore)
2. Sign the APK with your release key
3. Generate an AAB (Android App Bundle) instead of APK
4. Upload to Google Play Console

## 🔐 Default Credentials

### Guard Account (for testing):
- Mobile: Any registered number
- Password: User-defined during registration

### Super Admin Account:
- Mobile: 1234567890
- Password: admin123

## 🛠️ Build Information

**Build Command**: `./gradlew assembleRelease`  
**Build Time**: 4 minutes 43 seconds  
**Gradle Version**: 9.0.0  
**Android Build Tools**: Latest  
**Min SDK**: 23 (Android 6.0)  
**Target SDK**: Latest  

## 📝 Notes

- This is a **debug-signed** release APK suitable for testing
- For production release on Play Store, generate a proper release keystore
- The app requires internet connection to communicate with backend
- All data is stored on the backend server (Render)

## 🚀 Next Steps

1. **For Play Store Release**:
   - Generate release keystore
   - Build signed AAB
   - Set up Play Console account
   - Upload and publish

2. **For Direct Distribution**:
   - Share the APK file
   - Users can install directly on Android devices

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ using React Native**
