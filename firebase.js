import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/*const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBA0SE_APP_ID,
};
*/

// Add the new config with hardcoded values
const firebaseConfig = {
  apiKey: "AIzaSyDU6JzEN3QWz-CMED0RcKfPaxWbUliKE_8", // Paste your actual key here
  authDomain: "mate-appbolt.firebaseapp.com", // Paste your actual domain here
  projectId: "mate-appbolt", // Paste your actual project ID here
  storageBucket: "mate-appbolt.firebasestorage.app", // etc.
  messagingSenderId: "125842862724",
  appId: "1:125842862724:web:bad40bf72beed0702548d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;