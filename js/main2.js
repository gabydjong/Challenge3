L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FieTkiLCJhIjoiY2s4azUwZXJvMDIwMDNtb296ejRzdmtxciJ9.ai4IrKbKLtQWdU_IGAd-Kw';
var geocoder = L.mapbox.geocoder('mapbox.places'),
    map = null;



// both versions to add the featurelayer work

function showMap(err, data) {
    // The geocoder can return an area, like a city, or a
    // point, like an address. Here we handle both cases,
    // by fitting the map bounds to an area or zooming to a point.
    if (!map) {
        map = L.mapbox.map('map','openstreetmap');
    }

    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 12);
    }
}


function geocodeThis() {
    var text = document.getElementById('cityName').value;
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}