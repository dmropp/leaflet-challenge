var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"; // All earthquakes in the past day

d3.json(queryURL).then(function(data) {
    createMarkers(data.features);
})

function createMarkers(earthquakeData) { 
    // create markers based on earthquake coordinates and depth
    console.log(earthquakeData);

    // var earthquaks = earthquakeData;
    var earthquakeMarkerArray = [];

    for (i = 0; i < earthquakeData.length; i++) {
        var earthquake = earthquakeData[i].geometry.coordinates;
        var earthquakeMarker = L.marker([earthquake[0], earthquake[1]]).bindPopup("<h3>I'm an earthquake</h3>");
        console.log(earthquake);
        earthquakeMarkerArray.push(earthquakeMarker);
    }

    console.log(earthquakeMarkerArray);

    createMap(L.layerGroup(earthquakeMarkerArray));
};

//function to create markers for data.features.geometry.coordinates

function createMap(earthquakeLocations) {
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