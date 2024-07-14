function initMap() {
    // The location of the center
    var center = {lat: -34.397, lng: 150.644};
    // The map, centered at the location
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center
    });
    // The marker, positioned at the center
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
}

// Load the Google Maps API script and initialize the map
function loadScript() {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
    script.async = true;
    document.head.appendChild(script);
}

window.onload = loadScript;
