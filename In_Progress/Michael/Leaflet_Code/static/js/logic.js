function createMap(dogRests,wheelRests,bothRests){

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "streetmap":streetmap
  };

  // Create an overlayMaps object to hold the Dog Restaurants layer
  var overlayMaps_dog = {
    "Dog Restaurants": dogRests
  };

  // Create an overlayMaps object to hold the Wheelchair Restaurants layer
  var overlayMaps_wheel = {
    "Wheelchair Restaurants": wheelRests
  };

  // Create an overlayMaps object to hold the Both Restaurants layer
  var overlayMaps_both = {
    "Both Dog & Wheelchair Restaurants": bothRests
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [37.7749, -122.4194],
    zoom: 12,
    layers: [lightmap, streetmap, dogRests, wheelRests, bothRests]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps_dog, overlayMaps_wheel, overlayMaps_both, {
    collapsed: false
  }).addTo(map);

// EVERYTHING BELOW STILL NEEDS EDITING TO CORRECTLY REFERENCE THE JSON //
function createMarkers(response) {

    // Pull the "name" property off of response.data
    var dogrest_name = response.data.rest_name;

    // Initialize array to hold markers for each restaurant for comfort dog accessability
    var dogMarkers = [];
  
    // Loop through the each array
    for (var index = 0; index < dogrest_name.length; index++) {
      var restAccess_dog = dogrest_name[index];

      // For each restaurant, create a marker and bind a popup with the restaurant's name 
      var dogrestMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + restAccess_dog.rest_name + "<h3><h3>Capacity: " + restAccess_dog.neighborhood + "<h3>");

      // Add the marker to the dogMarkers array
      dogMarkers.push(dogrestMarker);
    }
    // Pull the "name" property off of response.data
    var wheelrest_name = response.data.rest_name;

    // Initialize array to hold markers for each restaurant for wheelchair accessability
    var wheelMarkers = [];

    // Loop through the each array
    for (var index = 0; index < wheelrest_name.length; index++) {
      var restAccess_wheel = wheelrest_name[index];

      // For each restaurant, create a marker and bind a popup with the restaurant's name 
      var wheelrestMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + restAccess_wheel.rest_name + "<h3><h3>Capacity: " + restAccess_wheel.neighborhood + "<h3>");

      // Add the marker to the dogMarkers array
      wheelMarkers.push(wheelrestMarker);
    }
    // Pull the "name" property off of response.data
    var bothrest_name = response.data.rest_name;

    // Initialize array to hold markers for each restaurant for both kinds of accessability
    var bothMarkers = [];

    // Loop through the each array
    for (var index = 0; index < bothrest_name.length; index++) {
      var restAccess_both = bothrest_name[index];

      // For each restaurant, create a marker and bind a popup with the restaurant's name & neighborhood
      var bothrestMarker = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + restAccess_both.rest_name + "<h3><h3>Capacity: " + restAccess_both.neighborhood + "<h3>");

    // Add the marker to the dogMarkers array
    bothMarkers.push(bothrestMarker);
}
  // Create a layer group made from the each restaurant markers array, pass it into the createMap function
  createMap(L.layerGroup(dogrestMarkers));
  createMap(L.layerGroup(wheelrestMarkers));
  createMap(L.layerGroup(bothrestMarkers));
}

// Reference JSON files to get restaurant information. Call createMarkers when complete.
d3.json("dog_rest_geojson.json", createMarkers);
d3.json("both_dog_wc_geojson.json", createMarkers);
d3.json("wheelchair_rest_geojson.json", createMarkers)
}
