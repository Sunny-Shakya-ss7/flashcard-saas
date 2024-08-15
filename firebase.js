// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_lk0kBvAQoUSjjUR0qMqiVK-4a6NkmGc",
  authDomain: "flashcard-saas-b3ee8.firebaseapp.com",
  projectId: "flashcard-saas-b3ee8",
  storageBucket: "flashcard-saas-b3ee8.appspot.com",
  messagingSenderId: "1010252022407",
  appId: "1:1010252022407:web:2dc78fdfbf8fc74e0d2e22",
  measurementId: "G-2RJ6PB1ZBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);