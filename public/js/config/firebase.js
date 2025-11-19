// Firebase Configuration and Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCjJLE_Mgrv3HONhkkgApmUNVlGdnAIcvI",
    authDomain: "clinic-a17bc.firebaseapp.com",
    projectId: "clinic-a17bc",
    storageBucket: "clinic-a17bc.firebasestorage.app",
    messagingSenderId: "5214960983",
    appId: "1:5214960983:web:4da52f47c510a50b3cd212",
    measurementId: "G-7YM2Z0BY98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
