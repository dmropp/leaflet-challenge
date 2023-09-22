//var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"; // All earthquakes in the past day
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(queryURL).then(function(data) {
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
            color = "lightred";
        } else {
            color = "red";
        }
        //console.log(magnitude);

        // var earthquake = earthquakeData[i].geometry.coordinates;
        // var earthquakeMarker = L.marker([earthquake[0], earthquake[1]]).bindPopup("<h3>I'm an earthquake</h3>");
        // console.log(earthquake);
        // earthquakeMarkerArray.push(earthquakeMarker);

        var earthquakeMarker = L.circle([lng, lat], {
            color: color,
            fillColor: color,
            opacity: 0.75,
            radius: Math.pow(mag, 7) //may need to be an absolute value
        }).bindPopup(`<h3>Magnitude: ${mag} Depth: ${depth} km</h3>`); 
        earthquakeMarkerArray.push(earthquakeMarker);
    }

    console.log(earthquakeMarkerArray);

    createMap(L.layerGroup(earthquakeMarkerArray));
};

//function to create markers for data.features.geometry.coordinates

function createMap(earthquakeLocations) { // Need to add legend somewhere in here
    //function to create map tile layer



    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // var baseMap = {
    //     //function to create base map, this function is used for selecting map layers, may not need
    // };

    // var overlayMap = { // function to toggle overlay map on or off, may not need

    // };

    var map = L.map("map", {
        // what coordinates do I need to center the map? Center of the world???
        center: [37.09, -95.71], 
        zoom: 5,
        layers: [streetmap, earthquakeLocations]
    });

};