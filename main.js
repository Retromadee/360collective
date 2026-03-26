import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVHByNDIIP3bYctCSMHW6krcvz4_CeOeQ",
  authDomain: "creative-70d22.firebaseapp.com",
  projectId: "creative-70d22",
  storageBucket: "creative-70d22.firebasestorage.app",
  messagingSenderId: "996447106939",
  appId: "1:996447106939:web:e42eb587541123532e6fde",
  measurementId: "G-Q35P33ZW5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const servicesContainer = document.querySelector('.services-grid');

/**
 * Fetch and display services from Realtime Database
 */
function loadServices() {
    const servicesRef = ref(db, 'services');
    onValue(servicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // If we have data in RTDB, we could dynamically update the UI
            console.log("Services loaded from Firebase:", data);
            // This can be expanded to render service cards dynamically
        } else {
            console.log("No services found in database, using static content.");
        }
    });
}

// Interactivity
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    
    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });
});
