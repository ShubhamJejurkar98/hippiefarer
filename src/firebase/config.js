// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVBDW-Ot4pGVsWoYw9HMEop77jvmQ4dLQ",
  authDomain: "hippiefarerweb.firebaseapp.com",
  projectId: "hippiefarerweb",
  storageBucket: "hippiefarerweb.appspot.com",
  messagingSenderId: "107135000462",
  appId: "1:107135000462:web:4aba3a350a1caf27950edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };