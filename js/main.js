function getAPIdata() {

	// construct request
	var zoekbalk = document.getElementById('cityName').value;
	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='e096950819a2dd2441ca3cec5396aca4';
	var cityName = document.getElementById('cityName').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + cityName;

	// get current weather
	fetch(request)

	// parse response to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);
	var weerTemp = document.getElementById('weerTemp');
	weerTemp.innerHTML = (degC + "&#8451");

	// Gevoelstemperatuur
	var gevTemp = Math.floor(response.main.feels_like - 273.15);
	var tempGevoel = document.getElementById('tempGevoel');
   	tempGevoel.innerHTML = (gevTemp + " °C");

	// Windsnelheid
	var windSpeed = response.wind.speed;
	var weerWind = document.getElementById('weerWind');
	weerWind.innerHTML = (windSpeed + " m/s");

	// Vochtigheid
	var humidity = response.main.humidity;
	var vochtigheid = document.getElementById('vocht');
	vochtigheid.innerHTML = (humidity + "%");

}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	 document.getElementById('button').classList.add('btn-animation'); 
}

/* MAPS */
//Dit is het code voor de MAP
function showMapBox(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FieTkiLCJhIjoiY2s4azUwZXJvMDIwMDNtb296ejRzdmtxciJ9.ai4IrKbKLtQWdU_IGAd-Kw';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [50, 50], // starting position [lng, lat]
		zoom: 1 // starting zoom
	});

// Zoekfunctie
var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	marker: {
		color: '#2C3F51'
	},
	flyTo: {
		bearing: 0,
		// These options control the flight curve, making it move
		// slowly and zoom out almost completely before starting
		// to pan.
		speed: 0.4, // make the flying slow
		curve: 1, // change the speed at which it zooms out
		// This can be any easing function: it takes a number between
		// 0 and 1 and returns another number between 0 and 1.
		easing: function(t) {
			return t;
		}
	},
	mapboxgl: mapboxgl
});

// Geschikte landingsplekken 
var geojson = {
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'properties': {
				'message': 'Foo',
				'iconSize': [60, 60]
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [-66.324462890625, -16.024695711685304]
			}
		},
		{
			'type': 'Feature',
			'properties': {
				'message': 'Bar',
				'iconSize': [50, 50]
			},
			'geometry': {
			'type': 'Point',
				'coordinates': [-61.2158203125, -15.97189158092897]
			}
		},
		{
			'type': 'Feature',
			'properties': {
				'message': 'Baz',
				'iconSize': [40, 40]
			},
			'geometry': {
			'type': 'Point',
				'coordinates': [-63.29223632812499, -18.28151823530889]
			}
		}
	]
};

// add markers to map 
geojson.features.forEach(function(marker) {
	// create a DOM element for the marker
	var el = document.createElement('div');
	el.className = 'marker';
	el.style.backgroundImage =
		'url(https://placekitten.com/g/' +
		marker.properties.iconSize.join('/') +
		'/)';
	el.style.width = marker.properties.iconSize[0] + 'px';
	el.style.height = marker.properties.iconSize[1] + 'px';
	 
	el.addEventListener('click', function() {
		window.alert(marker.properties.message);
});
 
// add marker to map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
});

// zoekbalk
map.addControl(geocoder);

// Navigatie buttons
map.addControl(new mapboxgl.NavigationControl());

// optie fullscreen
map.addControl(new mapboxgl.FullscreenControl());

}


window.onload = function() {
  showMapBox();
}