# 🚀 Setup Guide - Message in a Bottle

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `message-in-bottle` (or your choice)
4. Google Analytics: Optional (you can disable for simplicity)
5. Click "Create project"
6. Wait for project creation to complete
7. Click "Continue"

### 2. Enable Firestore Database

1. In the left sidebar, click on **"Build"** > **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - This allows read/write access for 30 days
   - You can change rules later for production
4. Choose a location closest to your users
   - Example: `us-central`, `europe-west`, `asia-east`
5. Click **"Enable"**
6. Wait for database creation (takes a few seconds)

### 3. Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. Enter app nickname: `Message in a Bottle Web App`
6. **Don't** check "Also set up Firebase Hosting" (we'll do this separately)
7. Click **"Register app"**
8. You'll see a code snippet with `firebaseConfig` object

### 4. Copy Your Configuration

Copy ONLY the config object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 5. Update Your Project

1. Open `src/services/firebase.js` in your code editor
2. Find the section that says:
   ```javascript
   // TODO: Replace with your Firebase project configuration
   const firebaseConfig = {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       ...
   };
   ```
3. Replace the ENTIRE `firebaseConfig` object with your copied config
4. Save the file

### 6. Test Your Setup

1. Open `public/index.html` in your browser
   - OR run `npm start` if you installed dependencies
2. Open browser console (F12)
3. Look for any errors
4. Try throwing a bottle
5. Check Firestore Console - you should see a new document in the `bottles` collection!

## Quick Verification Checklist

- [ ] Firebase project created
- [ ] Firestore Database enabled and active
- [ ] Firestore started in "test mode"
- [ ] Web app registered in Firebase
- [ ] Configuration copied to `firebase.js`
- [ ] No errors in browser console
- [ ] Can throw a bottle successfully
- [ ] Can see bottle in Firestore Console
- [ ] Can fish for bottles

## Common Setup Issues

### "Firebase not defined" error
- **Cause**: Firebase not loaded or configuration incorrect
- **Fix**: Check that firebaseConfig is properly set in `firebase.js`

### "Permission denied" error
- **Cause**: Firestore rules are too restrictive
- **Fix**: Make sure Firestore is in "test mode" or rules allow access

### "Failed to get document" error
- **Cause**: Firestore not enabled or collection doesn't exist
- **Fix**: Verify Firestore Database is created and enabled

### Nothing happens when clicking buttons
- **Cause**: JavaScript not loading
- **Fix**: Check browser console for errors, verify file paths

## Production Deployment Steps

### Update Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Copy the contents from `firestore.rules` in your project
3. Paste into the Firebase Console rules editor
4. Click **"Publish"**

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI (one time)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore (configure rules and indexes)
# - Hosting (configure hosting)

# Use existing project and select your project

# For Firestore:
# - Rules file: firestore.rules
# - Indexes file: firestore.indexes.json

# For Hosting:
# - Public directory: public
# - Single-page app: No
# - Automatic builds: No

# Deploy everything
firebase deploy

# Or deploy specific services:
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

Your app will be live at: `https://your-project-id.web.app`

## Environment Variables (Optional)

For added security, you can use environment variables:

1. Create `.env` file in project root (already in .gitignore)
2. Add your config:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```
3. Update `firebase.js` to use `import.meta.env.VITE_*`

Note: This requires a build tool like Vite. Current setup uses plain JavaScript for simplicity.

## Support

If you encounter issues:

1. Check browser console (F12) for error messages
2. Verify Firebase configuration is correct
3. Ensure Firestore is enabled and accessible
4. Check Firestore rules in Firebase Console
5. Try in incognito/private mode to rule out extensions
6. Check network tab to see if Firebase requests are succeeding

## Next Steps

Once setup is complete:

1. Customize the styling in `public/styles.css`
2. Adjust message limits if needed
3. Test with multiple users/browsers
4. Deploy to Firebase Hosting
5. Share your ocean URL with friends!

---

**Need help? Check the main README.md for more troubleshooting tips!**
