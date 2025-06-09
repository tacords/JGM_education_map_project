// Initialize the map centered on Peru
var map = L.map('map').setView([-9.19, -75.0152], 5); // latitude/longitude and zoom

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);