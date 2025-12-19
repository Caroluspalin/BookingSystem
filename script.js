document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- 3. Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- 4. Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; });

    // --- 5. Booking Logic ---
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:30', '15:30', '16:30', '18:00'];
    let selectedDate = null;
    let selectedTime = null;

    const dateContainer = document.getElementById('date-scroller');
    const timeContainer = document.getElementById('time-grid');
    const summaryText = document.getElementById('booking-summary');
    const confirmBtn = document.getElementById('confirm-btn');

    // Generate Dates
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        if (nextDate.getDay() === 0) continue; // Skip Sunday

        const dayName = days[nextDate.getDay()];
        const dayNumber = nextDate.getDate();

        const card = document.createElement('div');
        card.className = 'date-card';
        card.innerHTML = `<span style="font-size:0.8rem; opacity:0.8">${dayName}</span><span style="font-size:1.5rem; font-weight:700">${dayNumber}</span>`;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDate = `${dayName} ${dayNumber}.${nextDate.getMonth() + 1}.`;
            updateSummary();
        });
        dateContainer.appendChild(card);
    }

    // Generate Times
    timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.innerText = time;
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTime = time;
            updateSummary();
        });
        timeContainer.appendChild(slot);
    });

    function updateSummary() {
        if (selectedDate && selectedTime) {
            summaryText.innerHTML = `<i class="fas fa-check-circle"></i> ${selectedDate} at ${selectedTime}`;
            confirmBtn.disabled = false;
        }
    }

    confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        setTimeout(() => {
            confirmBtn.style.backgroundColor = '#4CAF50';
            confirmBtn.innerText = 'Confirmed!';
            alert(`Booking Confirmed:\n${selectedDate} at ${selectedTime}`);
            setTimeout(() => location.reload(), 1000);
        }, 1500);
    });

    // --- 6. Chatbot Logic (Lukee chat-data.js tiedostoa) ---
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const messagesContainer = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');

    // Toggle Chat
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && messagesContainer.children.length === 0) {
            initChat();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    function initChat() {
        addMessage("Hi! Welcome to Palin Cuts. How can I help you today?", 'bot');
        renderOptions();
    }

    function renderOptions() {
        optionsContainer.innerHTML = ''; 
        // Tarkistetaan löytyykö chatData (se toinen tiedosto)
        if (typeof chatData !== 'undefined') {
            chatData.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = item.question;
                btn.onclick = () => handleOptionClick(item);
                optionsContainer.appendChild(btn);
            });
        } else {
            console.error("Error: chat-data.js not loaded or empty.");
            addMessage("Error: Could not load questions.", 'bot');
        }
    }

    function handleOptionClick(item) {
        addMessage(item.question, 'user');
        scrollToBottom();
        optionsContainer.innerHTML = ''; // Piilota napit hetkeksi
        
        setTimeout(() => {
            addMessage(item.answer, 'bot');
            scrollToBottom();
            renderOptions(); // Näytä napit uudestaan
        }, 600);
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text;
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

});