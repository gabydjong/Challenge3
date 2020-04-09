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

	//Zicht
	var visibility = response.visibility;
	var zichtbaarheid = document.getElementById('zicht');
	zichtbaarheid.innerHTML = (visibility + " m");

}

/* Laat animatie tonen op de button als er een error plaatsvind */
function onAPIError(error) {
	console.error('Fetch request failed', error);
	 document.getElementById('button').classList.add('btn-animation'); 
}

/* MAPBOX */
//Dit is de code voor de MAP
function showMapBox(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FieTkiLCJhIjoiY2s4azUwZXJvMDIwMDNtb296ejRzdmtxciJ9.ai4IrKbKLtQWdU_IGAd-Kw';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [5, 52], // starting position [lng, lat]
		zoom: 5 // starting zoom
	});


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
		speed: 0.6, // make the flying slow
		curve: 1, // change the speed at which it zooms out
		// This can be any easing function: it takes a number between
		// 0 and 1 and returns another number between 0 and 1.
		easing: function(t) {
			return t;
		}
	},
	mapboxgl: mapboxgl
});


// zoekbalk
map.addControl(geocoder);

// Navigatie
map.addControl(new mapboxgl.NavigationControl());

// optie fullscreen
map.addControl(new mapboxgl.FullscreenControl());

// Add geolocate control to the map.
map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true
	})
);

// ----------------------------   Weer in de mapBox   ------------------------------

var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'Rotterdam',
    coordinates: [4.47917, 51.9225]
  },
  {
    name: 'Nijmegen',
    coordinates: [5.85278, 51.8425]
  },
  {
    name: 'Maastricht',
    coordinates: [5.68889, 50.84833]
  },
  {
    name: 'Groningen',
    coordinates: [6.56667, 53.21917]
  },
  {
    name: 'Enschede',
    coordinates: [6.89583, 52.21833]
  },
  {
    name: 'Middelburg',
    coordinates: [3.610998, 51.498795]
  },
  {
    name: 'Eschwege',
    coordinates: [10.052540, 51.188301]
  },
  {
    name: 'Norwich',
    coordinates: [1.297355, 52.630886]
  },
  {
    name: 'Lille',
    coordinates: [3.057256, 50.629250]
  },
  {
    name: 'London',
    coordinates: [-0.127758, 51.507351]
  },
  {
    name: 'New York',
    coordinates: [-74.005974, 40.712776]
  },
  {
    name: 'Moskou',
    coordinates: [37.617680, 55.755871]
  },
];

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = 'e096950819a2dd2441ca3cec5396aca4';

map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});



// Iconen van weathermap
function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1
        }
      });
    }
  );
}

}

// UNSPLASH API Random foto van landingsplek

function unsplashAPI() {

	
const numItemsToGenerate = 1; //how many gallery items you want on the screen
const numImagesAvailable = 242; //how many total images are in the collection you are pulling from
const imageWidth = 400; //your desired image width in pixels
const imageHeight = 400; //desired image height in pixels
const collectionID = 9845613; //the collection ID from the original url
const $galleryContainer = document.querySelector('.gallery-container');

function renderGalleryItem(randomNumber){
  fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`) 
    .then((response)=> {    
      let galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
        <img class="gallery-image" src="${response.url}" alt="gallery image"/>
      `
      $galleryContainer.appendChild(galleryItem);
    })
}

/* Zorgt dat hij random foto pakt */

for(let i=0;i<numItemsToGenerate;i++){
  let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
  renderGalleryItem(randomImageIndex);
}
}


window.onload = function() {
  showMapBox();
  unsplashAPI();
}