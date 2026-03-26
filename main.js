import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import firebaseConfig from "./firebase-config.js";

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

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Light by default as requested
    body.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Interactivity
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
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
            navbar.style.padding = '0.7rem 0';
            navbar.style.background = 'var(--nav-bg)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'var(--nav-bg)';
        }
    });
});
