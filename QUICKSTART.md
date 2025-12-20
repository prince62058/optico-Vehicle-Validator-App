# 🚀 Quick Start Guide - Vehicle Validator App

Get up and running with the Vehicle Validator App in 5 minutes!

---

## 📱 For End Users (Mobile App Only)

### Option 1: Download Pre-built APK (Recommended)

1. **Download the APK:**
   - Navigate to [`Vehicle_Validator_App/Vehicle-Validator-v1.0.apk`](Vehicle_Validator_App/Vehicle-Validator-v1.0.apk)
   - Or download from [Releases](https://github.com/prince62058/optico-Vehicle-Validator-App/releases)

2. **Install on Android Device:**
   - Transfer APK to your Android phone
   - Enable "Install from Unknown Sources" in Settings
   - Tap the APK file and install

3. **Launch the App:**
   - Open "Vehicle Validator" app
   - Login with test credentials or signup

4. **Test Credentials:**
   ```
   Super Admin:
   Mobile: 1234567890
   Password: admin123
   ```

**Note:** The app requires an active backend server. You can either:
- Use the deployed backend (if available)
- Run your own backend (see Developer Setup below)

---

## 💻 For Developers (Full Stack Setup)

### Prerequisites
- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas account
- Android Studio (for Android development)
- Git installed

### Step 1: Clone Repository
```bash
git clone https://github.com/prince62058/optico-Vehicle-Validator-App.git
cd optico-Vehicle-Validator-App
```

### Step 2: Setup Backend (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vehicle_validator
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
EOF

# Start MongoDB (if running locally)
# mongod --dbpath /path/to/your/data/directory

# Start backend server
npm run dev
```

**Expected Output:**
```
Server running on port 5001
MongoDB connected successfully
```

### Step 3: Setup Mobile App (5 minutes)

```bash
# Open new terminal
cd Vehicle_Validator_App

# Install dependencies
npm install

# For iOS only (macOS)
cd ios && pod install && cd ..

# Update API URL in services/api.js
# Change BASE_URL to your backend URL:
# - Android Emulator: http://10.0.2.2:5001/api
# - iOS Simulator: http://localhost:5001/api
# - Physical Device: http://YOUR_LOCAL_IP:5001/api

# Start Metro bundler
npm start

# In another terminal, run the app
npm run android  # For Android
# OR
npm run ios      # For iOS (macOS only)
```

### Step 4: Test the App

1. **Login as Super Admin:**
   - Mobile: `1234567890`
   - Password: `admin123`

2. **Test Features:**
   - ✅ Add a vehicle
   - ✅ Search for vehicles
   - ✅ Update vehicle details
   - ✅ View staff list
   - ✅ Register new staff

---

## 🔧 Quick Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
mongod
```

**Port Already in Use:**
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>
```

### Mobile App Issues

**Metro Bundler Cache Issues:**
```bash
npm start -- --reset-cache
```

**Android Build Errors:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Cannot Connect to Backend:**
- Ensure backend is running on port 5001
- Check firewall settings
- Verify API URL in `services/api.js`
- For Android emulator, use `http://10.0.2.2:5001/api`

---

## 📚 Next Steps

- Read the [Full Documentation](README.md)
- Explore [API Documentation](README.md#-api-documentation)
- Check [Release Notes](RELEASE_NOTES.md)
- Review [User Roles & Permissions](README.md#-user-roles--permissions)

---

## 🆘 Need Help?

- **Documentation:** See [README.md](README.md)
- **Issues:** [GitHub Issues](https://github.com/prince62058/optico-Vehicle-Validator-App/issues)
- **API Testing:** Import `backend/postman.json` into Postman

---

## 📊 Project Structure Overview

```
optico-Vehicle-Validator-App/
├── Vehicle_Validator_App/     # React Native Mobile App
│   ├── Screens/               # All UI screens
│   ├── services/api.js        # API integration
│   └── Vehicle-Validator-v1.0.apk  # Production APK
│
├── backend/                   # Node.js Backend
│   ├── models/                # Database schemas
│   ├── routes/                # API endpoints
│   ├── controllers/           # Business logic
│   └── index.js               # Server entry point
│
└── README.md                  # Full documentation
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server running on port 5001
- [ ] MongoDB connected successfully
- [ ] Mobile app launches without errors
- [ ] Can login with test credentials
- [ ] Can add a new vehicle (Super Admin)
- [ ] Can search for vehicles
- [ ] Can view vehicle list
- [ ] API endpoints responding correctly

---

## 🎯 Common Use Cases

### Use Case 1: Security Checkpoint
1. Guard logs in
2. Vehicle arrives
3. Guard searches by registration number
4. Views vehicle details
5. Allows/denies entry based on records

### Use Case 2: Vehicle Registration
1. Admin logs in
2. Navigates to "Add Vehicle"
3. Fills in vehicle details
4. Saves new vehicle record
5. Vehicle now searchable by all users

### Use Case 3: Staff Management
1. Super Admin logs in
2. Navigates to "Admin" tab
3. Views all staff members
4. Registers new guard/admin
5. New staff can now login

---

## 🚀 Deployment Tips

### Backend Deployment (Render/Heroku)
```bash
# Set environment variables
PORT=5001
MONGODB_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<strong_secret_key>
NODE_ENV=production

# Start command
npm start
```

### Mobile App Distribution
- Use the pre-built APK for testing
- For production, sign the APK with your keystore
- Consider publishing to Google Play Store

---

<div align="center">

**🎉 You're all set! Happy coding!**

[Report Issues](https://github.com/prince62058/optico-Vehicle-Validator-App/issues) • [View Full Docs](README.md) • [Star Repository](https://github.com/prince62058/optico-Vehicle-Validator-App)

</div>
