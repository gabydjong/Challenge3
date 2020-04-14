function getAPIdata() {

	// Aanvraag
	var zoekbalk = document.getElementById('cityName').value;
	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='e096950819a2dd2441ca3cec5396aca4';
	var cityName = document.getElementById('cityName').value;

	// Aanvraag request. 
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + cityName;

	// Krijg recente weer.
	fetch(request)

	// parse response to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

// render weer per dag. 
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
	// Krijg het type weer in string formaat. 
	var type = response.weather[0].description;

	// Krijg temperatuur in celsius. 
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

// Dit is de code voor de marker Geocoder. 
var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	marker: {
		color: '#2C3F51'
	},
	flyTo: {
		bearing: 0,
		//  Deze opties controleren de flight curve, het zorgt ervoor dat er langzaam naar de 
    // locatie wordt gegaan. 
		speed: 0.6, // Zorgt hoe snel naar de marker gevlogen wordt. 
		curve: 1, // Verander de snelheid van het uitzoemen. 
	},
	mapboxgl: mapboxgl
});

/* EVENTUELE LANDINGSPLEKKEN */

var landingsplek = [4.750680, 52.632359];
var alternatief = [-1.158109, 52.954784];
var alternatiefTwee = [9.732010, 52.375893];


// Maakt de popup met tekst. 
var popup = new mapboxgl.Popup({ offset: 25 }).setText(
'Hier kunt u veilig landen!'
);

// Maakt de popup met tekst voor de alternatieve landingsplek. 
var popupTwee = new mapboxgl.Popup({ offset: 25 }).setText(
'Als u een alternatieve landingsplek wilt kunt u hier ook veilig landen!'
);

// Maakt de popup met tekst voor tweede alternatieve landingsplek. 
var popupDrie = new mapboxgl.Popup({ offset: 25 }).setText(
'Als u een alternatieve landingsplek wilt kunt u hier ook veilig landen!'
);

// Maakt DOM element voor de eerste landingsplek marker aan. 
var el = document.createElement('div');
el.id = 'marker';

// Maakt DOM element voor de alternatieve landingsplek marker aan. 
var al = document.createElement('div');
al.id = 'marker';

// Maakt DOM element voor tweede alternatieve landingsplek marker aan. 
var altTwee = document.createElement('div');
altTwee.id = 'marker';

// Maakt de marker voor de eerste landingsplek
new mapboxgl.Marker(el)
.setLngLat(landingsplek)
.setPopup(popup) // Zorgt voor een popup op de marker
.addTo(map);

// Maakt de marker voor de alternatieve landingsplek.
new mapboxgl.Marker(al)
.setLngLat(alternatief)
.setPopup(popupTwee) // Zorgt voor een popup op de marker
.addTo(map);

// Maakt de marker voor tweede alternatieve landingsplek.
new mapboxgl.Marker(altTwee)
.setLngLat(alternatiefTwee)
.setPopup(popupDrie) // Zorgt voor een popup op de marker
.addTo(map);


// Zoekbalk
map.addControl(geocoder);

// Navigatie knoppen
map.addControl(new mapboxgl.NavigationControl());

// Optie fullscreen knop
map.addControl(new mapboxgl.FullscreenControl());

// Voegt geolocate control toe aan de map.
map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true
	})
);

// ----------------------------   Weer in de mapBox   ------------------------------

// Coordinates van alle steden waarop een weericoon te vinden moet zijn. 
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

// Haalt de url en de apikey op. 
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

// UNSPLASH API Random foto van eventuele landingsplek

function unsplashAPI() {
	
const numItemsToGenerate = 1; // Hoeveel gallery items je op het scherm wilt.
const numImagesAvailable = 10; // Hoeveel random foto's in je collectie zit. 
const imageWidth = 400; //Image width in pixels.
const imageHeight = 400; //Image height in pixels.
const collectionID = 9845613; //Collectie ID 
const $galleryContainer = document.querySelector('.gallery-container');

// Functie random nummer
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

// Zorgt dat de functies worden getoont als scherm geladen is. 
window.onload = function() {
  showMapBox();
  unsplashAPI();
}