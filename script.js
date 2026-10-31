// Welcome message
window.addEventListener("load", function () {
    alert("Welcome to Luxury Glow Hair & Beauty Salon!");
});

// Show current date and time
function showDateTime() {
    const now = new Date();

    document.getElementById("dateTime").innerHTML =
        now.toLocaleString();
}

// Analysis page status
function checkStatus() {
    document.getElementById("status").innerHTML =
        "Luxury Glow Salon is currently promoting services through social media while developing its website.";
}

// Show/hide SWOT analysis
function toggleSWOT() {
    let swot = document.getElementById("swot");

    if (swot.style.display === "none") {
        swot.style.display = "block";
    } else {
        swot.style.display = "none";
    }
}

// Design page info
function showDesignInfo() {
    document.getElementById("designInfo").innerHTML =
        "Our design uses soft pink and white colours to create an elegant and welcoming salon experience.";
}

// Dark mode
function darkMode() {
    document.body.classList.toggle("dark-mode");
}

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const bookingForm = document.getElementById("bookingForm");

// REGISTER
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            alert("This email is already registered.");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Please sign in.");
        window.location.href = "login.html";
    });
}

// SIGN IN
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", user.email);
            alert("Welcome, " + user.name + "!");
            window.location.href = "booking.html";
        } else {
            alert("Incorrect email or password.");
        }
    });
}

// APPOINTMENT BOOKING
if (bookingForm) {
    if (!localStorage.getItem("loggedInUser")) {
        alert("Please sign in before booking.");
        window.location.href = "login.html";
    }

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!localStorage.getItem("loggedInUser")) {
            alert("Please sign in first.");
            window.location.href = "login.html";
            return;
        }

        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(date + "T00:00:00") < today) {
            alert("Please choose today or a future date.");
            return;
        }

        const appointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        appointments.push({
            email: localStorage.getItem("loggedInUser"),
            service: service,
            date: date,
            time: time
        });

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        alert("Appointment booked successfully!");
        bookingForm.reset();
    });
}

const inquiryForm = document.getElementById("inquiryForm");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("inquiryName").value.trim();
        const email = document.getElementById("inquiryEmail").value.trim();
        const subject = document.getElementById("inquirySubject").value.trim();
        const message = document.getElementById("inquiryMessage").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const inquiry = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        const inquiries =
            JSON.parse(localStorage.getItem("inquiries")) || [];

        inquiries.push(inquiry);

        localStorage.setItem("inquiries", JSON.stringify(inquiries));

        document.getElementById("inquiryFeedback").textContent =
            "Thank you! Your inquiry has been submitted successfully.";

        InquiryForm.reset();
    });
}

const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent =
            image.closest(".service-card")?.querySelector("h3")?.textContent || image.alt;

        lightbox.classList.add("open");
    });
});

closeLightbox.addEventListener("click", function () {
    lightbox.classList.remove("open");
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("open");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        lightbox.classList.remove("open");
    }
});

const salonServices = [
    {
        name: "Hair Styling",
        category: "hair",
        price: 200,
        image: "installation.jpg"
    },
    {
        name: "Nail Treatment",
        category: "nails",
        price: 350,
        image: "nails.jpg"
    },
    {
        name: "Eyelash Extensions",
        category: "lashes",
        price: 220,
        image: "OIP (3).webp"
    },
    {
        name: "Hair Braiding",
        category: "hair",
        price: 400,
        image: "braids2.jpg"
    }
];

const servicesGallery = document.getElementById("servicesGallery");
const serviceSearch = document.getElementById("serviceSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const noServices = document.getElementById("noServices");

function displayServices() {
    if (!servicesGallery) return;

    const searchText = serviceSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedSort = priceSort.value;

    let filteredServices = salonServices.filter(function(service) {
        const matchesSearch =
            service.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            service.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (selectedSort === "low-high") {
        filteredServices.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "high-low") {
        filteredServices.sort((a, b) => b.price - a.price);
    }

    servicesGallery.innerHTML = "";

    filteredServices.forEach(function(service) {
        const card = document.createElement("div");
        card.className = "service-card";

        const image = document.createElement("img");
        image.src = service.image;
        image.alt = service.name;
        image.className = "gallery-img";

        image.addEventListener("error", function() {
            image.alt = service.name + " image unavailable";
        });

        const heading = document.createElement("h3");
        heading.textContent = service.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "R" + service.price;

        card.append(image, heading, price);
        servicesGallery.appendChild(card);
    });

    noServices.style.display =
        filteredServices.length === 0 ? "block" : "none";
}

if (servicesGallery) {
    serviceSearch.addEventListener("input", displayServices);
    categoryFilter.addEventListener("change", displayServices);
    priceSort.addEventListener("change", displayServices);

    displayServices();
}

// Make dynamically displayed salon pictures enlarge
document.addEventListener("click", function (event) {
    const image = event.target.closest(".gallery-img");
    img.loading = "lazy";

    if (!image) return;

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (lightboxCaption) {
        const serviceName = image
            .closest(".service-card")
            ?.querySelector("h3");

        lightboxCaption.textContent =
            serviceName ? serviceName.textContent : image.alt;
    }

    lightbox.classList.add("open");
});

const budgetButton = document.getElementById("calculateBudget");

if (budgetButton) {
    budgetButton.addEventListener("click", function () {

        let development = 15000;
        let hosting = 2000;
        let maintenance = 6000;

        let total = development + hosting + maintenance;

        document.getElementById("budgetResult").textContent =
            "Your estimated first-year budget is R" +
            total.toLocaleString("en-ZA");
    });
}

// Change the design theme

const themeButton = document.getElementById("themeButton");

if (themeButton) {
    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("alternate-theme");

        if (document.body.classList.contains("alternate-theme")) {
            document.getElementById("themeMessage").textContent =
                "You are now using the alternative theme!";
        } else {
            document.getElementById("themeMessage").textContent =
                "You are now using the original pink theme!";
        }

    });
}