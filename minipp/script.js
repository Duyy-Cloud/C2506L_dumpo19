const requiredEmail = "d.staffeld@yahoo.de";
const requiredPassword = "12345";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("error");
const dashboard = document.getElementById("dashboard");
const loginPage = document.getElementById("loginPage");
const logoutBtn = document.getElementById("logout");
const redirectToBookingPageBtn = document.getElementById("redirectToBookingPage");
const rememberMe = document.getElementById("rememberMe");

const eventForm = document.getElementById("eventForm");
const eventsList = document.getElementById("eventsList");
const createEventSection = document.getElementById("createEventSection");

const events = [];


if (sessionStorage.getItem("loggedIn") !== "true") {
    showDashboard();  
} else {
    loginPage.style.display = "block";  
    dashboard.style.display = "none";  
}


loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isValidLogin(email, password)) {
        showErrorMessage("Oops email or password doesn't seem right.");
        return;
    }

    sessionStorage.setItem("loggedIn", "true");
    showDashboard();
});


function isValidLogin(email, password) {
    return email === requiredEmail && password === requiredPassword;
}


function showErrorMessage(message) {
    errorMsg.textContent = message;
}


function showDashboard() {
    loginPage.style.display = "none";
    dashboard.style.display = "block";
    createEventSection.style.display = "none";
    eventsList.style.display = "none";

    document.getElementById("redirectToBookingPage").style.display = "block";
    document.getElementById("logout").style.display = "block";

    
    const totalEvents = events.length;
    const totalUsers = getRandomEventData();
    const totalTickets = getRandomEventData();

    document.getElementById("events").textContent = `Total Events: ${totalEvents}`;
    document.getElementById("users").textContent = `Total Users: ${totalUsers}`;
    document.getElementById("tickets").textContent = `Tickets Booked Today: ${totalTickets}`;
}


function getRandomEventData() {
    return Math.floor(Math.random() * (1000 - 100) + 100); 
}


redirectToBookingPageBtn.addEventListener("click", () => {
    dashboard.style.display = "none"; 
    createEventSection.style.display = "block"; 
    eventsList.style.display = "block"; 

    document.getElementById("redirectToBookingPage").style.display = "none"; 
});


logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedIn");
    dashboard.style.display = "none";
    loginPage.style.display = "block";
});


function renderEventsList() {
    const eventCards = document.getElementById("eventCards");
    eventCards.innerHTML = '';

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('widget');
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Category: ${event.category}</p>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <p>Price: $${event.price}</p>
            <p>Seats Available: ${event.seats}</p>
            <button onclick="editEvent(${event.id})">Edit</button>
            <button onclick="showDeleteModal(${event.id})">Delete</button>
            <button onclick="bookTicket(${event.id})">Book Ticket</button>
        `;
        eventCards.appendChild(eventCard);
    });
}

//  edit an event // 
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    document.getElementById("eventName").value = event.name;
    document.getElementById("category").value = event.category;
    document.getElementById("date").value = event.date;
    document.getElementById("location").value = event.location;
    document.getElementById("price").value = event.price;
    document.getElementById("seats").value = event.seats;

    const saveBtn = document.getElementById("saveEventBtn");
    saveBtn.textContent = "Update Event";
    saveBtn.onclick = () => updateEvent(eventId);
}

// update event // 
function updateEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    event.name = document.getElementById("eventName").value;
    event.category = document.getElementById("category").value;
    event.date = document.getElementById("date").value;
    event.location = document.getElementById("location").value;
    event.price = document.getElementById("price").value;
    event.seats = document.getElementById("seats").value;

    renderEventsList();
    document.getElementById("saveEventBtn").textContent = "Save Event";
}


function showDeleteModal(eventId) {
    const modal = document.getElementById("deleteModal");
    modal.style.display = "flex";

    document.getElementById("confirmDelete").onclick = () => deleteEvent(eventId);
    document.getElementById("cancelDelete").onclick = () => modal.style.display = "none";
}
// Del evetn btn // 
function deleteEvent(eventId) {
    const eventIndex = events.findIndex(e => e.id === eventId);
    events.splice(eventIndex, 1);
    renderEventsList();
    document.getElementById("deleteModal").style.display = "none";
}

// Book ticket // 
function bookTicket(eventId) {
    const event = events.find(e => e.id === eventId);
    alert(`Booking ticket for ${event.name} at $${event.price}`);
}

// Save event button // 
const saveEventBtn = document.getElementById("saveEventBtn");
saveEventBtn.addEventListener("click", () => {
    const eventName = document.getElementById("eventName").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const seats = document.getElementById("seats").value;

    if (!eventName || !category || !date || !location || !price || !seats) {
        alert("Please fill all fields.");
        return;
    }

    const newEvent = {
        id: events.length + 1,
        name: eventName,
        category: category,
        date: date,
        location: location,
        price: price,
        seats: seats
    };

    events.push(newEvent);
    renderEventsList();

    document.getElementById("eventForm").reset();
});
