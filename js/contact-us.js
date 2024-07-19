function initMap() {
    var center = {lat: -34.397, lng: 150.644};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center
    });
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
}

function loadScript() {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
    script.async = true;
    document.head.appendChild(script);
}

window.onload = loadScript;
