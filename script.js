const events = [
    {
        id: 1,
        title: "Music Fest 2023",
        date: "2023-11-25",
        location: "City Park",
        description: "A grand music festival featuring top artists.",
        image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 2,
        title: "Food Carnival",
        date: "2023-12-10",
        location: "Downtown Plaza",
        description: "A feast for food lovers with a variety of cuisines.",
        image: "https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2011/9/9/0/CCKEL211_Fried-Pickles-with-Buttermilk-Dressing-2_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1392789364659.jpeg"
    },
];

function changeContent(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = getContentForPage(page);
}

// function getContentForPage(page) {
//     const pages = {
//         home: `
//             <h2>Welcome to EventSpot Lite</h2>
//             <p>Your one-stop platform to find local events!</p>
//             <p>Select "Events" to see what's happening near you.</p>
//         `,
//         about: `
//             <h2>About Us</h2>
//             <p>EventSpot Lite is a platform designed to help you find local events easily and efficiently.</p>
//             <p>Our mission is to connect people with events that interest them and bring communities together through shared experiences.</p>
//         `,
//         events: showEvents(),
//         contact: `
//             <h2>Contact Us</h2>
//             <form class="contact-form" onsubmit="handleFormSubmit(event)">
//                 <label for="name">Name:</label>
//                 <input type="text" id="name" name="name" placeholder="Your Name" required>
//                 <label for="email">Email:</label>
//                 <input type="email" id="email" name="email" placeholder="Your Email" required>
//                 <label for="message">Message:</label>
//                 <textarea id="message" name="message" placeholder="Your Message" required></textarea>
//                 <button type="submit">Send</button>
//             </form>
//         `,
//     };
//     return pages[page] || <h2>Page not found!</h2>;
// }
function getContentForPage(page) {
    const pages = {
        home: `<h2>Welcome to EventSpot Lite</h2>
               <p>Your one-stop platform to find local events!</p>
               <p>Select "Events" to see what's happening near you.</p>`,
        about: `<h2>About Us</h2>
                <p>EventSpot Lite is a platform designed to help you find local events easily and efficiently.</p>
                <p>Our mission is to connect people with events that interest them and bring communities together through shared experiences.</p>`,
        events: `<h2>Upcoming Events</h2><div class="event-grid">${events.map(eventCardTemplate).join('')}</div>`,
        contact: `<h2>Contact Us</h2>
                  <form class="contact-form" onsubmit="handleFormSubmit(event)">
                      <label for="name">Name:</label>
                      <input type="text" id="name" name="name" placeholder="Your Name" required>
                      <label for="email">Email:</label>
                      <input type="email" id="email" name="email" placeholder="Your Email" required>
                      <label for="message">Message:</label>
                      <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                      <button type="submit">Send</button>
                  </form>`
    };
    return pages[page] || "<h2>Page not found!</h2>";
}

function showEvents() {
    return `
        <h2>Upcoming Events</h2>
        <div class="event-grid">
            ${events.map(eventCardTemplate).join('')}
        </div>
    `;
}

function eventCardTemplate({ id, image, title, date, location }) {
    return `
        <div class="event-card" data-id="${id}">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${date}</p>
            <p>${location}</p>
        </div>
    `;
}

const modal = {
    element: document.getElementById('eventModal'),
    title: document.getElementById('modalEventTitle'),
    date: document.getElementById('modalEventDate'),
    location: document.getElementById('modalEventLocation'),
    description: document.getElementById('modalEventDescription'),

    open(eventId) {
        const event = events.find(e => e.id === eventId);
        this.title.innerText = event.title;
        this.date.innerText = `Date: ${event.date}`;
        this.location.innerText = `Location: ${event.location}`;
        this.description.innerText = event.description;
        this.element.style.display = "block";
    },

    close() {
        this.element.style.display = "none";
    }
};

document.getElementById('content').addEventListener('click', (event) => {
    const card = event.target.closest('.event-card');
    if (card) {
        const eventId = parseInt(card.getAttribute('data-id'), 10);
        modal.open(eventId);
    }
});

document.getElementById('eventModal').addEventListener('click', () => {
    modal.close();
});

modal.element.addEventListener('click', (event) => {
    if (event.target === modal.element) {
        modal.close();
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    alert('Form submitted!'); 
}

changeContent('home');
