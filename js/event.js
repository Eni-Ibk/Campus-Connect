async function loadEvents() {
  const response = await fetch("events.json");
  let events = await response.json();

  const eventList = document.getElementById("eventList");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOptions = document.getElementById("sortOptions");
  const upcomingTab = document.getElementById("upcomingTab");
  const pastTab = document.getElementById("pastTab");

  let currentTab = "upcoming";

  function renderEvents(eventsToRender) {
    eventList.innerHTML = "";
    if (eventsToRender.length === 0) {
      eventList.innerHTML = <p style="text-align:center; color:#777;">No events found.</p>;
      return;
    }
    eventsToRender.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h2>${event.name}</h2>
        <p><strong>Date & Time:</strong> ${new Date(event.date).toLocaleDateString()} – ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
      `;
      eventList.appendChild(card);
    });
  }

  function filterAndSort() {
    let now = new Date();
    let filtered = events.filter(e => {
      let eventDate = new Date(e.date);
      if (currentTab === "upcoming") {
        return eventDate >= now;
      } else {
        return eventDate < now;
      }
    });

    if (categoryFilter.value !== "all") {
      filtered = filtered.filter(e => e.category === categoryFilter.value);
    }

    if (sortOptions.value === "dateAsc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOptions.value === "dateDesc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOptions.value === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOptions.value === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    renderEvents(filtered);
  }

  // Event Listeners
  categoryFilter.addEventListener("change", filterAndSort);
  sortOptions.addEventListener("change", filterAndSort);

  upcomingTab.addEventListener("click", () => {
    currentTab = "upcoming";
    upcomingTab.classList.add("active");
    pastTab.classList.remove("active");
    filterAndSort();
  });

  pastTab.addEventListener("click", () => {
    currentTab = "past";
    pastTab.classList.add("active");
    upcomingTab.classList.remove("active");
    filterAndSort();
  });

  filterAndSort(); // Initial load
}

loadEvents();