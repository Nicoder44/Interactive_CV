import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBf_vr8RieHVtMoWWWQvqsYBjzIQZyLgyk",
  authDomain: "interactivecv-d04a7.firebaseapp.com",
  databaseURL: "https://interactivecv-d04a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "interactivecv-d04a7",
  storageBucket: "interactivecv-d04a7.firebasestorage.app",
  messagingSenderId: "435864758678",
  appId: "1:435864758678:web:5b803f762fed8ed22755b7"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
