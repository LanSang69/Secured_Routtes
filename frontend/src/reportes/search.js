let map;
let center;
let marker; // To store the marker that will be placed on the map

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  center = { lat: 37.4161493, lng: -122.0812166 };
  map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
    mapId: "map",
    disableDefaultUI: true, // Disables default controls (like zoom buttons)
  });

  const beachFlagImg = document.createElement("img");
  
  beachFlagImg.src =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  
  const beachFlagMarkerView = new AdvancedMarkerElement({
    map,
    position: { lat: 37.434, lng: -122.082 },
    content: beachFlagImg,
    title: "A marker using a custom PNG Image",
  });
  
  map.addListener("click", (event) => {
    const clickedLocation = event.latLng;

    if (marker) {
        marker.setPosition(clickedLocation);
        marker.setMap(null);
    } else {
      // Place a new marker if one doesn't exist
      const marker =  new AdvancedMarkerElement({
        map:map,
        content: beachFlagImg,
        position: clickedLocation,
        title: 'Seleccionar locación',
        gmpClickable: true,
    });
    }

    // Log or display the coordinates of the clicked location
    console.log("Selected location:", clickedLocation.toString());
    console.log("Latitude:", clickedLocation.lat());
    console.log("Longitude:", clickedLocation.lng());
  });

  // Call the findPlaces function to load results based on an initial query
  findPlaces();
}

async function findPlaces(query) {
  const { Place } = await google.maps.importLibrary("places");
  //@ts-ignore
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  if (!query) {
    query = "ESCOM";
  }

  const request = {
    textQuery: query,
     fields: ["displayName", "location"],
    isOpenNow: true,
    language: "es",
    maxResultCount: 7,
    minRating: 3.2,
    region: "mx",
    useStrictTypeFiltering: false,
  };

  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location);
      console.log(place);
    });
    map.setCenter(bounds.getCenter());
  } else {
    console.log("No results");
  }
}

function removeAllMarkers() {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
  }

document.getElementById("search-button").addEventListener("click", (event) => {
  event.preventDefault(); // Prevents page reload
  const userInput = document.getElementById("search").value.trim();
  if (userInput) {
    findPlaces(userInput);
  } else {
    alert("Please enter a search query.");
  }
});

// Initialize the map
initMap();
