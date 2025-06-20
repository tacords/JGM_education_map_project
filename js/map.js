$(document).ready(function() {

    var map = L.map('map').setView([-9.19, -75.0152], 5); // Centered on Peru

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    function getColor(value) {
      return value > 10 ? '#2ca25f' :   // green
          value > 6 ? '#ffcc00' :   // yellow
                '#de2d26';    // red
    }


    fetch('data/peru_regions.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
})
      .then(data => {

        // Assign a random avg years of schooling (1–16) to each province
        data.features.forEach(feature => {
            feature.properties.educationLevel = Math.floor(Math.random() * 16) + 1;
        }); // delete this line later to use real data

        L.geoJson(data, {
            style: function (feature){
              const value = feature.properties.educationLevel;
                return {
                    fillColor: getColor(value),
                    weight: 2,
                    fillOpacity: 0.6,
                    maxZoom: 12,
                    color: 'white',
                    dashArray: '3'
                };
            },
            onEachFeature: function (feature, layer) {
            const name = feature.properties.shapeName;
            const value = feature.properties.educationLevel;
            const dropoutRate = feature.properties.dropoutRate || "21%"; // fallback if not defined
            layer.bindPopup(`<strong>${name}</strong><br>Average years of schooling: ${value}<br>School dropout rate: ${dropoutRate}</strong>`);
            }
        }).addTo(map);
      })
      .catch(error => {
        console.error("Error loading GeoJSON:", error);
      });
});