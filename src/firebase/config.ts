import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8XqppVUmBknFjt77Pwsv0baE0ALfEjfQ",
  authDomain: "ats-resume-44374.firebaseapp.com",
  projectId: "ats-resume-44374",
  storageBucket: "ats-resume-44374.firebasestorage.app",
  messagingSenderId: "17246229787",
  appId: "1:17246229787:web:45592e7d18085eb1e7afbe",
  measurementId: "G-41SFN8JHER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;