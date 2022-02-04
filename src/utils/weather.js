const axios = require('axios');

const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

const weather = (lat, lon, callback) => {
    axios.get(baseURL, {
		params: {
			lat: lat,
			lon: lon,
			appid: '5660f4accf49f9e35e7e8179636efef2',
			units: 'metric'
		}
	})
	.then(function (response) {
		const data = response.data;
		const weather_type = data.weather[0].main;
		const temp = data.main.temp;
		const string = 'Temperature : ' + temp + ' and Weather : ' + weather_type;

		callback(undefined, string);
	})
	.catch(function (error) {
		callback("Unable to connect weather service");
	})
	.then(function () {
		// always executed
	}); 
}

module.exports = weather;