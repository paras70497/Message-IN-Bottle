// Firebase Configuration Template
// Copy this file and paste your actual Firebase configuration

/*
 * HOW TO GET YOUR FIREBASE CONFIG:
 * 
 * 1. Go to https://console.firebase.google.com/
 * 2. Select your project (or create a new one)
 * 3. Click the gear icon (⚙️) > Project settings
 * 4. Scroll down to "Your apps" section
 * 5. Click the web icon (</>)
 * 6. Register app and copy the config object shown
 * 7. Paste it into src/services/firebase.js
 */

// This is what your config should look like:
const firebaseConfig = {
    apiKey: "AIzaSy...",                    // Your actual API key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// IMPORTANT NOTES:
// 
// ✅ DO: Keep your Firebase config in the code (it's meant to be public)
// ✅ DO: Use Firestore security rules to protect your data
// ✅ DO: Test in "test mode" first, then update rules for production
// 
// ❌ DON'T: Share your Google Cloud service account keys (different from this config)
// ❌ DON'T: Leave Firestore in test mode for more than 30 days in production
// ❌ DON'T: Forget to enable Firestore Database in Firebase Console
//
// 🔒 Security: Your API key in the config is safe to expose. It's restricted
//              by Firebase security rules and authorized domains.
