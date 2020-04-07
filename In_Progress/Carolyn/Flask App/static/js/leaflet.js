function createMap(bothRests) {

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
    "Street Map":streetmap
  };

  // Create an overlayMaps object to hold the Both Restaurants layer
  var overlayMaps_both = {
    "Both Dog Friendly & Wheelchair Acessible Restaurants": bothRests
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [37.7749, -122.4194],
    zoom: 12,
    layers: [lightmap, streetmap, bothRests]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps_both, {
    collapsed: false
  }).addTo(map);
};

function createMarkers(response) {

  // Pull the "name" property off of response.features
  var both_rests = response.features;

  // Initialize an array to hold "both"restaurant markers
  var restMarkers = [];

  // Loop through the both_rests array
  for (var index = 0; index < both_rests.length; index++) {
    var both = both_rests[index];
    

    // For each restaurant, create a marker and bind a popup with the station's name
    var restMarker = L.marker([both.geometry.coordinates[1], both.geometry.coordinates[0]])
      .bindPopup("<b><a href='" + both.properties.website + "'>" + both.properties.name + "</a></b><br><b>Address:</b> " + both.properties.address + "</b><br><b>Neighborhood</b>: " + both.properties.neighborhood + "</br>");

    // Add the marker to the restMarkers array
    restMarkers.push(restMarker);
  }
    // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(restMarkers));
};
// Reference Both Restaurants JSON to get restaurant information. Call createMarkers when complete

d3.json("/both_restaurants_geojson", createMarkers);