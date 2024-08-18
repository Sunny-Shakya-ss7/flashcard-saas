// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-2RJ6PB1ZBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

// NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD_lk0kBvAQoUSjjUR0qMqiVK-4a6NkmGc
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flashcard-saas-b3ee8.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=flashcard-saas-b3ee8
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flashcard-saas-b3ee8.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1010252022407
// NEXT_PUBLIC_FIREBASE_APP_ID=1:1010252022407:web:2dc78fdfbf8fc74e0d2e22

// OPENROUTER_API_KEY=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
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51NFzWiFSEgAbR95yRZyAgzHGkeWkGrfcaPgwSRBCj37vTX7O4COpSVWI27WbXVRMmQNmf6TvEh4pSbuJYoODlxVC006NucBmCJ
// STRIPE_SECRET_KEY=sk_test_51NFzWiFSEgAbR95yLxdzn8EXVyIWBX2GC9bzD27he9Rok0J1nBOZ7QCqEc8jmBQBqme4yGPU8yvHVjJ7TCzgsa2m00ousjBRW7
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aG9seS1zYWxtb24tMTIuY2xlcmsuYWNjb3VudHMuZGV2JA
// CLERK_SECRET_KEY=sk_test_630eR55PTXgp5D3Sb65JysyOTuer1ruZYMEFJWaqgh
