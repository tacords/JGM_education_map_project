$(document).ready(function() {

    var map = L.map('map').setView([-9.19, -75.0152], 5); // Centered on Peru

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    function getColor(value) {
      return value > 66 ? '#2ca25f' :   // green
          value > 33 ? '#ffcc00' :   // yellow
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

        // Assign a random education level (1–100) to each province
        data.features.forEach(feature => {
            feature.properties.educationLevel = Math.floor(Math.random() * 100) + 1;
        }); // delete this line later to use real data

        L.geoJson(data, {
            style: function (feature){
              const value = feature.properties.educationLevel;
                return {
                    fillColor: getColor(value),
                    weight: 1,
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function (feature, layer) {
            const name = feature.properties.shapeName;
            const value = feature.properties.educationLevel;
              layer.bindPopup(`<strong>${name}</strong><br>Education Level: ${value}`);
            }
        }).addTo(map);
      })
      .catch(error => {
        console.error("Error loading GeoJSON:", error);
      });
});