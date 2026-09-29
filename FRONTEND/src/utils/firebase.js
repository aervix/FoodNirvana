// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodnirvana-5549b.firebaseapp.com",
  projectId: "foodnirvana-5549b",
  storageBucket: "foodnirvana-5549b.firebasestorage.app",
  messagingSenderId: "428618563231",
  appId: "1:428618563231:web:fe82a7c93c07737ddfacaa"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}