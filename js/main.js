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
	//var weatherBox = document.getElementById('weather');
	//weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

