// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCGvmEh3Z2WKf9ODh8phE9GJoUeNKRtml4",
  authDomain: "rightly-8a3fd.firebaseapp.com",
  projectId: "rightly-8a3fd",
  storageBucket: "rightly-8a3fd.firebasestorage.app",
  messagingSenderId: "980412471516",
  appId: "1:980412471516:web:26a429936dd873289e7c19",
  measurementId: "G-50FKVZMKPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
