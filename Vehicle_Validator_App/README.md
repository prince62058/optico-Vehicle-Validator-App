# Vehicle Validator App

A React Native mobile application for managing and validating vehicles at checkpoints. This app allows security personnel (Guards/Admins) to register, search, verify, and update vehicle details efficiently. It also includes a dedicated Super Admin portal for managing staff.

## 🚀 Features

### 1. Authentication & Security
*   **Dual Login System:**
    *   **User/Guard Login:** Standard login for daily operations.
    *   **Super Admin Login:** Dedicated secure gateway (Red Theme) for high-level management.
    *   **Signup:** Option to register new accounts directly from the app.
*   **Secure Storage:** Uses `AsyncStorage` to persist user sessions (Stay logged in).
*   **Role-Based Access Control (RBAC):**
    *   **Super Admin:** Full access to all tabs (Home, Add, Display, Admin) and ability to Update/Delete vehicles.
    *   **Public/Guard:** Restricted access. Can only view Home (Search) and Display (List) tabs. "Add Vehicle" and "Update/Delete" options are hidden.

### 2. Vehicle Management
*   **Dashboard (Home):** Quick search bar to find vehicles by Registration Number (e.g., "UP16").
*   **Add Vehicle:** Comprehensive form to register new vehicle entries (Owner Name, Type, Phone, Address). (Admin Only)
*   **Vehicle List (Display):** Scrollable list of all registered vehicles with "Pull to Refresh".
*   **Vehicle Details:** View complete profile of a vehicle.
*   **Operations:** Update vehicle details or Delete records directly from the app (Restricted to Admins).

### 3. Administration (Super Admin Only)
*   **Staff Management:** View a list of all registered Staff (Admins/Guards).
*   **Register Staff:** Ability to add new Admins or Guards to the system.
*   **Remove Staff:** Revoke access by deleting staff accounts.

---

## 🛠 Project Structure

```text
Vehicle_Validator_App/
├── App.tsx                 # Entry Point & Navigation Container
├── Navigations/
├── Screens/
│   ├── Login.jsx           # Main Login/Signup Screen
│   ├── AdminLogin.jsx      # Specialized Mobile+Role Login for Super Admin
│   ├── Home.jsx            # Dashboard & Search
│   ├── AddVehicle.jsx      # Form to add vehicles
│   ├── Display.jsx         # List of all vehicles
│   ├── VehicleDetails.jsx  # Detailed view & actions (Update/Delete)
│   ├── Update.jsx          # Edit Vehicle form
│   └── Admin.jsx           # Admin Dashboard (Staff Management)
└── services/
    └── api.js              # Centralized API service (Auth, Vehicles, Admin)
```

---

## 🔄 Recent Changes & Updates

### **1. Role-Based Navigation & UI**
*   **Dynamic Tabs:** The Bottom Navigation now dynamically renders tabs based on the logged-in user's role.
    *   *Super Admins* see 4 tabs: Home, Add, Display, Admin.
    *   *Guards* see 2 tabs: Home, Display.
*   **Conditional Rendering:** Update and Delete buttons in `VehicleDetails` are only visible to Admins.
*   **Fix:** Resolved `property 'role' of undefined` error by correctly parsing the backend response structure (flat object).

### **2. Authentication System Overhaul**
*   **New Screen:** Created `AdminLogin.jsx` strictly for Super Admins.
*   **Fix:** Updated login logic to send `mobile` and `role` ("superadmin") as required by the backend.
*   **UI:** Added a "Signup" toggle on the main login screen for easier onboarding.

### **3. UI/UX Enhancements**
*   **Logo:** Implemented a custom Vector Icon logo (Shield + Car) on the login screens.
*   **Feedback:** Added Loading indicators and Success/Error Alerts for better user feedback.

---

## 📲 How to Run

1.  **Start the Backend:**
    Ensure your Node.js backend is running on port **5001**.
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the Mobile App:**
    ```bash
    cd Vehicle_Validator_App
    npm run android
    # or
    npm run ios
    ```

## 🔑 Test Credentials

**Super Admin Access:**
*   **Mobile:** `1234567890`
*   **Password:** `admin123`

**Default Public Access:**
*   You can Signup within the app or use any registered mobile number.
