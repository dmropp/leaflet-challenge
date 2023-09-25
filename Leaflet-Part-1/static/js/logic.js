//var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"; // All earthquakes in the past day
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"; // All earthquakes in the past month

d3.json(queryURL).then(function(data) {
    console.log(data);
    createMarkers(data.features);
})

function createMarkers(earthquakeData) { 
    // create markers based on earthquake coordinates and depth
    console.log(earthquakeData);

    // var earthquaks = earthquakeData;
    var earthquakeMarkerArray = [];

    for (i = 0; i < earthquakeData.length; i++) {

        var mag = earthquakeData[i].properties.mag;
        var lng = earthquakeData[i].geometry.coordinates[0];
        var lat = earthquakeData[i].geometry.coordinates[1];
        var depth = earthquakeData[i].geometry.coordinates[2];
        var location = earthquakeData[i].properties.place;

        var color = "";

        if (depth < 10) {
            color = "green";
        } else if (depth < 30) {
            color = "lightgreen";
        } else if (depth < 50) {
            color = "yellow";
        } else if (depth < 70) {
            color = "orange";
        } else if (depth < 90) {
            color = "orangered";
        } else {
            color = "red";
        }

        var earthquakeMarker = L.circle([lat, lng], { // https://leafletjs.com/examples/quick-start/, referenced for how to create a circle marker
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: Math.pow(mag, 7) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow, referenced for how to calculate an exponent
        }).bindPopup(`<h3>Location: ${location} <br> Magnitude: ${mag} <br> Depth: ${depth} km</h3>`); 
        earthquakeMarkerArray.push(earthquakeMarker);// need to add earthquake location
    }

    console.log(earthquakeMarkerArray);

    createMap(L.layerGroup(earthquakeMarkerArray));
};

//function to create markers for data.features.geometry.coordinates

function createMap(earthquakeLocations) { // Need to add legend somewhere in here

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var map = L.map("map", {

        center: [41, 35], // https://en.wikipedia.org/wiki/Geographical_centre_of_Earth, referenced for coordinates for center of the Earth 
        zoom: 5,
        layers: [streetmap, earthquakeLocations]
    });

    var legend = L.control({position: "bottomright"}); // https://leafletjs.com/examples/choropleth/, referenced for how to create legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depths = [-10, 10, 30, 50, 70, 90];
        var labelColors = ["green", "lightgreen", "yellow", "orange", "orangered", "red"];
        var labels = [];

        var legendInfo = "<h4>Earthquake Depth</h4>"; //https://www.w3schools.com/TAGS/tag_hn.asp, referenced for how to change heading tags

        div.innerHTML = legendInfo;
        
        for (j = 0; j < depths.length; j++) {
            div.innerHTML += 
                '<i style="background:' + labelColors[j] + '"></i> ' + depths[j] + (depths[j + 1] ? '&ndash;' + depths[j + 1] + '<br>': '+'); 
        }

        return div;


    };

    legend.addTo(map);

};