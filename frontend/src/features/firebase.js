// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-web-builder-47.firebaseapp.com",
  projectId: "ai-web-builder-47",
  storageBucket: "ai-web-builder-47.firebasestorage.app",
  messagingSenderId: "1040166104186",
  appId: "1:1040166104186:web:33f57bc23cf0183bbc9fc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}