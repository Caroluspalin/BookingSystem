Palin Cuts | Modern Barber Shop Website

LIVE DEMO HERE, COPY AND PASTE TO BROWSER
https://caroluspalin.github.io/BookingSystem/index.html

A premium, fully responsive barber shop website featuring a functional real-time booking system. Designed with a clean, high-end aesthetic focusing on smooth user experience, modern typography, and seamless backend integration.

✨ Features
Modern UI/UX: A minimalist, "Apple-inspired" design with heavy use of whitespace, smooth scroll animations (fade-ins), and a responsive navigation bar that adapts on scroll.

Real-time Booking System: Powered by Google Firebase. Users can select a date and time slot. The system automatically disables time slots that have already been booked to prevent double bookings.

Admin Dashboard: A dedicated, password-protected admin interface (admin.html) to view all active bookings and cancel appointments dynamically.

Interactive Chatbot: A custom JavaScript widget ("Palin Assistant") that answers common questions (parking, prices, services) using a modular data structure.

Image Gallery: A CSS Grid-based gallery with a custom JavaScript lightbox for viewing high-resolution images.

Mobile First: Fully optimized layout for mobile devices, including a custom hamburger menu and touch-friendly booking controls.

🛠️ Tech Stack
HTML5: Semantic structure and accessible markup.

CSS3: Flexbox, CSS Grid, CSS Variables, and Keyframe Animations.

JavaScript (ES6+): DOM manipulation, Intersection Observers, and modular logic.

Google Firebase (Firestore): Serverless NoSQL database for storing and retrieving real-time booking data.

Font Awesome: For UI icons.

🚀 How to Run
Since this is a static site with a serverless backend, you don't need to install Node.js or run a local server environment.

Clone or Download this repository.

Navigate to the project folder.

Open index.html in any modern web browser (Chrome, Safari, Firefox).

Note: An internet connection is required for the Booking System and Chatbot to function (as they connect to Firebase).

📂 Project Structure
Plaintext
/BookingSystem
│
├── index.html       # Main landing page (Hero, Services, Booking, Chat)
├── admin.html       # Admin dashboard for managing bookings
├── style.css        # Global styling, animations, and responsive rules
├── script.js        # Main frontend logic & Firebase Booking integration
├── admin.js         # Logic for fetching and deleting bookings (Admin)
├── chatData.js      # Data file containing Q&A for the chatbot
└── README.md        # Project documentation
🔐 Admin Access
To access the admin panel, navigate to /admin.html in your browser.

Password: palin123 (Note: This is a client-side check for demonstration purposes).

© 2025 Palin Cuts. Built with precision.
