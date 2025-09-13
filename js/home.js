// Load upcoming events from JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {
      const container = document.getElementById("events-container");
      events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p>${event.description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading events:", error));
});

// --- Slideshow Logic ---
let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function showSlide(index) {
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

// --- Upcoming Events ---
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {
      const container = document.getElementById("events-container");
      events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p>${event.description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading events:", error));
});
