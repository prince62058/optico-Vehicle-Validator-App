# 🚗 Optico Vehicle Validator App


apk Link : https://drive.google.com/file/d/104dQfbx3QfUz9RPWUHS-w6QyYPolCY_L/view?usp=sharing

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.83.1-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A comprehensive mobile application for managing and validating vehicles at security checkpoints with role-based access control.**

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Download APK](#-download-apk)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Building APK](#-building-apk)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Screenshots](#-screenshots)
- [Download APK](#-download-apk)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Optico Vehicle Validator** is a full-stack mobile application designed for security checkpoints, parking management, and vehicle tracking systems. It enables security personnel to efficiently register, search, verify, and manage vehicle records with a robust role-based access control system.

### Key Highlights:
- ✅ **Dual Authentication System** - Separate login portals for Guards and Super Admins
- ✅ **Role-Based Access Control (RBAC)** - Granular permissions based on user roles
- ✅ **Real-time Vehicle Management** - Add, update, delete, and search vehicles instantly
- ✅ **Staff Management** - Super Admin portal for managing security personnel
- ✅ **Offline-First Design** - AsyncStorage for persistent sessions
- ✅ **RESTful API Backend** - Scalable Node.js + Express + MongoDB architecture
- ✅ **Production-Ready APK** - Signed release build included

---

## ✨ Features

### 🔐 Authentication & Security
- **Dual Login System:**
  - **Guard/User Login:** Standard authentication for daily operations
  - **Super Admin Login:** Dedicated secure portal with red theme for administrative access
  - **Signup:** Self-registration capability for new users
- **Persistent Sessions:** Auto-login using AsyncStorage
- **JWT-Based Authentication:** Secure token-based API communication
- **Password Encryption:** bcrypt hashing for secure password storage

### 🚙 Vehicle Management
- **Dashboard (Home):** 
  - Quick search by registration number (e.g., "UP16")
  - Real-time search results
  - Clean, intuitive interface
- **Add Vehicle:** 
  - Comprehensive registration form
  - Fields: Owner Name, Registration Number, Vehicle Type, Phone, Address
  - Admin-only access
- **Vehicle List (Display):**
  - Scrollable list of all registered vehicles
  - Pull-to-refresh functionality
  - Pagination support
- **Vehicle Details:**
  - Complete vehicle profile view
  - Update/Delete operations (Admin only)
  - Contact information display
- **Search & Filter:**
  - Fast search by registration number
  - Case-insensitive matching

### 👥 Administration (Super Admin Only)
- **Staff Management:**
  - View all registered staff members
  - Role-based staff listing (Admins/Guards)
- **Register Staff:**
  - Add new Admins or Guards to the system
  - Assign roles and permissions
- **Remove Staff:**
  - Revoke access by deleting staff accounts
  - Secure deletion with confirmation

### 🎨 UI/UX Features
- **Modern Design:** Clean, professional interface with custom icons
- **Loading Indicators:** Visual feedback for all async operations
- **Success/Error Alerts:** User-friendly notifications
- **Responsive Layout:** Optimized for various screen sizes
- **Custom Logo:** Shield + Car vector icon branding
- **Dynamic Navigation:** Tab visibility based on user role

---

## 🛠 Tech Stack

### Mobile App (Frontend)
| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.83.1 | Cross-platform mobile framework |
| React | 19.2.0 | UI library |
| React Navigation | 7.x | Navigation and routing |
| AsyncStorage | 2.2.0 | Local data persistence |
| Vector Icons | 10.3.0 | Icon library |
| TypeScript | 5.8.3 | Type safety |

### Backend (API Server)
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18.x | Runtime environment |
| Express.js | 4.22.1 | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 8.18.1 | ODM for MongoDB |
| JWT | 9.0.2 | Authentication tokens |
| bcryptjs | 3.0.2 | Password hashing |
| CORS | 2.8.5 | Cross-origin requests |
| Morgan | 1.10.1 | HTTP request logger |

---

## 📁 Project Structure

```
Mobile_App/
├── Vehicle_Validator_App/          # React Native Mobile App
│   ├── App.tsx                     # Entry point & Navigation setup
│   ├── Screens/                    # All screen components
│   │   ├── Login.jsx               # Main login/signup screen
│   │   ├── AdminLogin.jsx          # Super Admin login portal
│   │   ├── Home.jsx                # Dashboard & search
│   │   ├── AddVehicle.jsx          # Vehicle registration form
│   │   ├── Display.jsx             # Vehicle list view
│   │   ├── VehicleDetails.jsx      # Detailed vehicle view
│   │   ├── Update.jsx              # Edit vehicle form
│   │   └── Admin.jsx               # Staff management dashboard
│   ├── Navigations/                # Navigation configuration
│   │   └── BottomTabNavigator.jsx  # Bottom tab navigation
│   ├── services/                   # API integration
│   │   └── api.js                  # Centralized API service
│   ├── android/                    # Android native code
│   ├── ios/                        # iOS native code
│   ├── Vehicle-Validator-v1.0.apk  # Production APK
│   └── package.json                # Dependencies
│
├── backend/                        # Node.js Backend API
│   ├── index.js                    # Server entry point
│   ├── config/                     # Configuration files
│   │   └── db.js                   # MongoDB connection
│   ├── models/                     # Mongoose schemas
│   │   ├── User.js                 # User/Staff model
│   │   └── Vehicle.js              # Vehicle model
│   ├── controllers/                # Business logic
│   │   ├── authController.js       # Authentication logic
│   │   ├── vehicleController.js    # Vehicle CRUD operations
│   │   └── adminController.js      # Admin operations
│   ├── routes/                     # API routes
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── vehicleRoutes.js        # Vehicle endpoints
│   │   └── adminRoutes.js          # Admin endpoints
│   ├── middlewares/                # Custom middlewares
│   │   ├── auth.js                 # JWT verification
│   │   └── roleCheck.js            # Role-based access
│   ├── utils/                      # Utility functions
│   ├── .env                        # Environment variables
│   ├── postman.json                # Postman collection
│   └── package.json                # Dependencies
│
└── README.md                       # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **JDK 17** (for Android builds)

### Clone the Repository
```bash
git clone https://github.com/prince62058/optico-Vehicle-Validator-App.git
cd optico-Vehicle-Validator-App
```

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
touch .env
```

4. **Configure environment variables:**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vehicle_validator
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vehicle_validator

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start the backend server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5001`

### Mobile App Setup

1. **Navigate to mobile app directory:**
```bash
cd ../Vehicle_Validator_App
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install iOS dependencies (macOS only):**
```bash
cd ios
pod install
cd ..
```

4. **Update API URL:**
Edit `services/api.js` and update the base URL:
```javascript
const BASE_URL = 'http://YOUR_IP_ADDRESS:5001/api';
// For Android Emulator: http://10.0.2.2:5001/api
// For iOS Simulator: http://localhost:5001/api
// For Physical Device: http://YOUR_LOCAL_IP:5001/api
```

5. **Start Metro bundler:**
```bash
npm start
```

6. **Run the app:**
```bash
# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

---

## ⚙️ Configuration

### Backend Configuration

**MongoDB Connection:**
- Update `MONGODB_URI` in `.env` file
- Ensure MongoDB is running locally or use MongoDB Atlas

**JWT Configuration:**
- Set a strong `JWT_SECRET` in `.env`
- Adjust `JWT_EXPIRE` for token expiration (default: 7 days)

**Port Configuration:**
- Default port: `5001`
- Change `PORT` in `.env` if needed

### Mobile App Configuration

**API Endpoint:**
- Update `BASE_URL` in `services/api.js`
- Use appropriate URL based on your testing environment

**App Name & Bundle ID:**
- Android: `android/app/build.gradle`
- iOS: `ios/Vehicle_Validator_App.xcodeproj`

---

## 🏃 Running the Application

### Development Mode

1. **Start Backend:**
```bash
cd backend
npm run dev
```

2. **Start Mobile App:**
```bash
cd Vehicle_Validator_App
npm start
# In another terminal
npm run android  # or npm run ios
```

### Production Mode

1. **Backend:**
```bash
cd backend
npm start
```

2. **Mobile App:**
- Use the pre-built APK from `Vehicle_Validator_App/Vehicle-Validator-v1.0.apk`
- Or build a new release (see [Building APK](#-building-apk))

---

## 📦 Building APK

### Debug APK
```bash
cd Vehicle_Validator_App/android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK (Production)

1. **Generate signing key (first time only):**
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure signing in `android/gradle.properties`:**
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
```

3. **Build release APK:**
```bash
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

4. **The APK will be located at:**
```
Vehicle_Validator_App/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### 1. User Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "mobile": "9876543210",
  "password": "password123",
  "role": "guard"  // or "superadmin"
}
```

#### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "mobile": "9876543210",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "mobile": "9876543210",
    "role": "guard"
  }
}
```

### Vehicle Endpoints

#### 3. Add Vehicle (Admin Only)
```http
POST /vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "registrationNumber": "UP16AB1234",
  "ownerName": "Jane Smith",
  "vehicleType": "Car",
  "phoneNumber": "9876543210",
  "address": "123 Main St, City"
}
```

#### 4. Get All Vehicles
```http
GET /vehicles
Authorization: Bearer {token}
```

#### 5. Search Vehicle
```http
GET /vehicles/search?q=UP16
Authorization: Bearer {token}
```

#### 6. Get Vehicle by ID
```http
GET /vehicles/:id
Authorization: Bearer {token}
```

#### 7. Update Vehicle (Admin Only)
```http
PUT /vehicles/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "ownerName": "Updated Name",
  "phoneNumber": "9999999999"
}
```

#### 8. Delete Vehicle (Admin Only)
```http
DELETE /vehicles/:id
Authorization: Bearer {token}
```

### Admin Endpoints

#### 9. Get All Staff (Super Admin Only)
```http
GET /admin/staff
Authorization: Bearer {token}
```

#### 10. Register Staff (Super Admin Only)
```http
POST /admin/staff
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Guard",
  "mobile": "8888888888",
  "password": "guard123",
  "role": "guard"
}
```

#### 11. Delete Staff (Super Admin Only)
```http
DELETE /admin/staff/:id
Authorization: Bearer {token}
```

### Postman Collection
Import `backend/postman.json` into Postman for ready-to-use API requests.

---

## 👥 User Roles & Permissions

### Super Admin
- ✅ Full access to all features
- ✅ View all tabs: Home, Add, Display, Admin
- ✅ Add, update, delete vehicles
- ✅ Manage staff (add/remove guards and admins)
- ✅ Access staff management dashboard

### Guard/User
- ✅ Limited access
- ✅ View tabs: Home, Display
- ✅ Search vehicles
- ✅ View vehicle details
- ❌ Cannot add vehicles
- ❌ Cannot update/delete vehicles
- ❌ Cannot access admin dashboard

### Public (Not Logged In)
- ✅ Can signup for new account
- ❌ No access to app features

---

## 🔑 Test Credentials

### Super Admin Access
```
Mobile: 1234567890
Password: admin123
```

### Guard Access
```
You can signup within the app or use any registered mobile number
```

---

## 📱 Screenshots

### Login Screens
- Main Login/Signup Screen
- Super Admin Login Portal (Red Theme)

### Dashboard
- Home Screen with Search
- Quick Vehicle Lookup

### Vehicle Management
- Add Vehicle Form
- Vehicle List View
- Vehicle Details Page
- Update Vehicle Form

### Admin Panel
- Staff Management Dashboard
- Register Staff Form

---

## 📥 Download APK

### Latest Release: v1.0.0

**Download the production-ready APK:**
- **File:** `Vehicle-Validator-v1.0.apk`
- **Size:** ~65 MB
- **Location:** `Vehicle_Validator_App/Vehicle-Validator-v1.0.apk`

**Installation Instructions:**
1. Download the APK file
2. Enable "Install from Unknown Sources" in Android settings
3. Open the APK file and install
4. Launch the app and login

**Minimum Requirements:**
- Android 6.0 (API 23) or higher
- 100 MB free storage
- Internet connection for API access

---

## 🔧 Troubleshooting

### Common Issues

**1. Metro Bundler Issues:**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

**2. Android Build Errors:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**3. iOS Build Errors:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**4. Backend Connection Issues:**
- Ensure backend is running on port 5001
- Check firewall settings
- Update API URL in `services/api.js`
- For Android emulator, use `http://10.0.2.2:5001/api`

**5. MongoDB Connection Issues:**
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Ensure network connectivity

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test thoroughly before submitting PR
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Prince Kumar**
- GitHub: [@prince62058](https://github.com/prince62058)
- Repository: [optico-Vehicle-Validator-App](https://github.com/prince62058/optico-Vehicle-Validator-App)

---

## 🙏 Acknowledgments

- React Native Community
- MongoDB Team
- Express.js Contributors
- All open-source libraries used in this project

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via repository discussions

---

## 🗺️ Roadmap

### Future Enhancements
- [ ] Push notifications for vehicle alerts
- [ ] QR code scanning for quick vehicle lookup
- [ ] Export vehicle data to CSV/PDF
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Vehicle image upload
- [ ] Analytics dashboard
- [ ] Offline mode with sync
- [ ] Biometric authentication

---

<div align="center">

**Made with ❤️ using React Native & Node.js**

⭐ Star this repository if you find it helpful!

</div>
