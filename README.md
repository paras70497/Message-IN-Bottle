# 🌊 Message in a Bottle

A beautiful web application where users can throw messages in bottles into a digital ocean and fish for messages from strangers around the world. Built with vanilla JavaScript and Firebase.

![Message in a Bottle](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🍾 **Throw Messages**: Write a message and throw it into the ocean for others to find
- 🎣 **Fish for Bottles**: Randomly catch bottles from the ocean and read their messages
- 🌊 **Live Ocean**: See all floating bottles in a beautiful animated ocean
- 💬 **Anonymous Messaging**: Share thoughts anonymously or with your name
- 🔄 **Real-time Updates**: Messages sync in real-time using Firebase
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ✨ **Beautiful Animations**: Smooth CSS animations for bottles and waves

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher) - optional, for development server
- A Firebase account (free tier works fine)
- A web browser

### Installation

1. **Navigate to the project**
   ```bash
   cd message-in-bottle
   ```

2. **Install dependencies** (optional - for development server)
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project (or use existing)
   
   c. Enable **Firestore Database**:
      - Go to Build > Firestore Database
      - Click "Create database"
      - Start in **test mode** (for development)
      - Choose a location closest to you
   
   d. Get your configuration:
      - Go to Project Settings (gear icon)
      - Scroll down to "Your apps"
      - Click the web icon (</>)
      - Copy the `firebaseConfig` object
   
   e. Update `src/services/firebase.js` with your config:
      ```javascript
      const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_PROJECT_ID.appspot.com",
          messagingSenderId: "YOUR_SENDER_ID",
          appId: "YOUR_APP_ID"
      };
      ```

4. **Run the application**
   ```bash
   npm start
   ```
   
   Or simply open `public/index.html` directly in your browser!

## 🗂️ Project Structure

```
message-in-bottle/
├── public/
│   ├── index.html          # Main HTML file with structure
│   ├── styles.css          # All styles and animations
│   └── assets/             # Images and other assets
├── src/
│   ├── app.js              # Main application logic and initialization
│   ├── components/
│   │   ├── bottle.js       # Bottle element creation and animations
│   │   ├── ocean.js        # Ocean display and bottle management
│   │   ├── messageForm.js  # Message writing form handler
│   │   └── messageReader.js # Message reading modal
│   ├── services/
│   │   └── firebase.js     # Firebase configuration & database API
│   └── utils/
│       └── helpers.js      # Utility functions
├── package.json            # Project metadata and dependencies
├── firebase.json           # Firebase hosting configuration
└── README.md              # This file
```

## 🎮 How to Use

### Throwing a Bottle

1. Click the **"✍️ Write a Message"** button
2. Type your message (10-500 characters)
3. Optionally add your name (or stay anonymous)
4. Click **"🍾 Throw Bottle into Ocean"**
5. Watch your bottle float into the ocean!

### Fishing for a Bottle

1. Click the **"🎣 Fish for a Bottle"** button
2. Enter your name when prompted (optional)
3. A random bottle will be caught and opened
4. Read the message from a stranger!
5. The bottle is removed from the ocean once caught

## 🔥 Firebase Setup Details

### Firestore Database Structure

The app uses a single collection called `bottles`:

```javascript
bottles/
  {bottleId}/
    message: string          // The message content
    author: string           // Author name or "Anonymous"
    thrownAt: timestamp      // When bottle was thrown
    isCaught: boolean        // Whether bottle has been caught
    caughtBy: string | null  // Who caught the bottle
    caughtAt: timestamp | null // When it was caught
```

### Security Rules (Production)

For production, add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bottles/{bottle} {
      // Anyone can read bottles
      allow read: if true;
      
      // Anyone can create bottles with valid data
      allow create: if request.resource.data.keys().hasAll(['message', 'author', 'thrownAt', 'isCaught'])
                    && request.resource.data.message.size() >= 10
                    && request.resource.data.message.size() <= 500
                    && request.resource.data.isCaught == false;
      
      // Only allow updating to mark as caught
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
                      .hasOnly(['isCaught', 'caughtBy', 'caughtAt'])
                    && request.resource.data.isCaught == true
                    && resource.data.isCaught == false;
      
      // No deletions
      allow delete: if false;
    }
  }
}
```

## 🐛 Troubleshooting

### Bottles not appearing?
- Check browser console for errors (F12)
- Verify Firebase configuration is correct
- Ensure Firestore database is created and active
- Check internet connection

### "Permission denied" error?
- Firestore security rules may be too restrictive
- Make sure database is in test mode OR rules allow read/write
- Verify Firebase project is active and not paused

### Styles not loading?
- Check that file paths are correct
- Clear browser cache (Ctrl+Shift+Delete)
- Verify `styles.css` exists in `public/` folder

### Firebase initialization error?
- Double-check all Firebase config values
- Make sure you copied the entire config object
- Verify your Firebase project is active

## 🌐 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Choose your project
   - Public directory: `public`
   - Single-page app: `No`

4. Deploy:
   ```bash
   firebase deploy
   ```

Your app will be live at: `https://YOUR-PROJECT-ID.web.app`

## 🎨 Customization

### Change Ocean Colors
Edit `public/styles.css`:
```css
body {
    background: linear-gradient(to bottom, #87CEEB 0%, #4A90E2 50%, #2E5F8F 100%);
}
```

### Adjust Animation Speed
```css
.bottle-floating {
    animation: float 6s ease-in-out infinite;  /* Change 6s */
}
```

### Modify Message Limits
In `src/components/messageForm.js`:
```javascript
if (message.length < 10) { ... }  // Minimum
```

In `public/index.html`:
```html
<textarea maxlength="500">  <!-- Maximum -->
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 💡 Future Ideas

- [ ] User authentication
- [ ] Reply to messages
- [ ] Bottle themes/colors
- [ ] Map view of bottle locations
- [ ] Language filters
- [ ] Message categories
- [ ] Private bottles
- [ ] Statistics dashboard

---

**Made with ❤️ for connecting strangers across the digital ocean** 🌊🍾