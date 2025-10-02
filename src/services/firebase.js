// Firebase Configuration and Service
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    getDoc,
    query, 
    where, 
    updateDoc, 
    doc, 
    serverTimestamp,
    orderBy,
    limit
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration - Connected to your project!
const firebaseConfig = {
    apiKey: "AIzaSyDGo6zskKev9-RwsIQ_svvRjtG96J_6ruc",
    authDomain: "messageinabottle-f243a.firebaseapp.com",
    projectId: "messageinabottle-f243a",
    storageBucket: "messageinabottle-f243a.firebasestorage.app",
    messagingSenderId: "304108095041",
    appId: "1:304108095041:web:e36541c0cbc38e51b628c0",
    measurementId: "G-0CSDVQM1SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a new message in a bottle to the ocean
export const throwBottle = async (messageText, authorName) => {
    try {
        const bottle = {
            message: messageText,
            author: authorName || 'Anonymous',
            thrownAt: serverTimestamp(),
            isCaught: false,  // Explicitly set as boolean false
            caughtBy: null,
            caughtAt: null
        };
        
        console.log('Throwing bottle:', bottle);
        
        const docRef = await addDoc(collection(db, 'bottles'), bottle);
        console.log('Bottle thrown with ID:', docRef.id);
        
        // Verify it was saved correctly
        const savedDoc = await getDoc(doc(db, 'bottles', docRef.id));
        console.log('Saved bottle data:', savedDoc.data());
        
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error throwing bottle:', error);
        return { success: false, error: error.message };
    }
};

// Get all uncaught bottles floating in the ocean
export const getFloatingBottles = async () => {
    try {
        // Simplified query - removed orderBy to avoid composite index requirement
        const q = query(
            collection(db, 'bottles'),
            where('isCaught', '==', false),
            limit(50)
        );
        
        const snapshot = await getDocs(q);
        const bottles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log('Found floating bottles:', bottles.length);
        console.log('Bottles data:', bottles);
        
        return bottles;
    } catch (error) {
        console.error('Error getting floating bottles:', error);
        console.error('Error details:', error.message);
        return [];
    }
};

// Catch a bottle from the ocean
export const catchBottle = async (bottleId, catcherName) => {
    try {
        const bottleRef = doc(db, 'bottles', bottleId);
        await updateDoc(bottleRef, {
            isCaught: true,
            caughtBy: catcherName || 'Anonymous',
            caughtAt: serverTimestamp()
        });
        
        console.log('Bottle caught:', bottleId);
        return { success: true };
    } catch (error) {
        console.error('Error catching bottle:', error);
        return { success: false, error: error.message };
    }
};

// Get a random uncaught bottle
export const fishRandomBottle = async () => {
    try {
        const bottles = await getFloatingBottles();
        if (bottles.length === 0) {
            return null;
        }
        
        // Get a random bottle from available ones
        const randomIndex = Math.floor(Math.random() * bottles.length);
        return bottles[randomIndex];
    } catch (error) {
        console.error('Error fishing random bottle:', error);
        return null;
    }
};

export { db };