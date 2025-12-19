document.addEventListener('DOMContentLoaded', () => {

    
    const password = prompt("Enter Admin Password:");
    if (password !== "palin123") { 
        alert("Wrong password!");
        window.location.href = "index.html"; 
    }

    
    const firebaseConfig = {
        apiKey: "AIzaSyDylypakqSyuaih65mjBIKEiQXyR-UorMM",
        authDomain: "palin-cuts-booking.firebaseapp.com",
        projectId: "palin-cuts-booking",
        storageBucket: "palin-cuts-booking.firebasestorage.app",
        messagingSenderId: "590801457174",
        appId: "1:590801457174:web:4ae2d7685640dced95a537",
        measurementId: "G-C0Q0S40ZPM"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    const listContainer = document.getElementById('booking-list');

    // 3. HAE VARAUKSET
    function loadBookings() {
        db.collection('bookings')
            .orderBy('date') // Järjestä päivämäärän mukaan
            .get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    listContainer.innerHTML = '<div class="empty-state">No active bookings found.</div>';
                    return;
                }

                let html = '';
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id; // Tarvitaan poistamista varten

                    // Muotoillaan HTML jokaiselle kortille
                    html += `
                        <div class="booking-card-admin" id="card-${id}">
                            <div class="booking-info">
                                <span class="booking-date"><i class="far fa-calendar"></i> ${data.date}</span>
                                <span class="booking-time"><i class="far fa-clock"></i> ${data.time}</span>
                            </div>
                            <div class="booking-actions">
                                <button onclick="deleteBooking('${id}')" class="btn-delete">
                                    <i class="fas fa-trash"></i> Cancel
                                </button>
                            </div>
                        </div>
                    `;
                });

                listContainer.innerHTML = html;
            })
            .catch((error) => {
                console.error("Error loading bookings:", error);
                listContainer.innerHTML = '<p>Error loading data.</p>';
            });
    }

    // 4. POISTA VARAUS
    // Tämä funktio pitää olla globaali (window), jotta HTML-nappi löytää sen
    window.deleteBooking = function(id) {
        if (confirm("Are you sure you want to cancel this booking? This cannot be undone.")) {
            
            // Poista visuaalisesti heti (nopeampi fiilis)
            document.getElementById(`card-${id}`).style.opacity = "0.5";

            // Poista Firebasesta
            db.collection('bookings').doc(id).delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    // Lataa lista uudestaan tai poista elementti kokonaan
                    document.getElementById(`card-${id}`).remove();
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                    alert("Error deleting booking.");
                });
        }
    };

    // Käynnistä haku heti
    loadBookings();

});