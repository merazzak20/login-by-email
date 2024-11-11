// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADK-kVBvhPrMYv7IZHF969CBdZzrlxg4k",
  authDomain: "login-by-email-79e19.firebaseapp.com",
  projectId: "login-by-email-79e19",
  storageBucket: "login-by-email-79e19.firebasestorage.app",
  messagingSenderId: "250680317786",
  appId: "1:250680317786:web:cd758a4b9f6e8943eb8563",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
