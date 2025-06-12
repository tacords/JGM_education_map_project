$(document).ready(function() {
    console.log("Map.js running");

    var map = L.map('map').setView([-9.19, -75.0152], 5); // Centered on Peru
    console.log("Map initialized");

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    fetch('data/peru_regions.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
})
      .then(data => {
        console.log("GeoJSON loaded:", data);
        L.geoJson(data, {
            style: {
            color: 'blue',
            weight: 2,
            fillOpacity: 0.5
            },
            onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.shapeName);
            }
        }).addTo(map);
      })
      .catch(error => {
        console.error("Error loading GeoJSON:", error);
      });
});