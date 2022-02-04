const axios = require('axios');

const geocode = (address, callback) => {
	const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json';

	axios.get(mapboxURL, {
		params: {
			access_token: 'pk.eyJ1IjoiYXJhYmlrYWJpciIsImEiOiJja29icW5wY3cyN3lwMm9zN29vcjBoNWNwIn0.Y420LMhYUKKlp4Uq_F0z2w',
			limit: 1
		}
	})
	.then(function (response) {
        const lat = response.data.features[0].center[1];
        const lon = response.data.features[0].center[0];

		const place_name = response.data.features[0].place_name;

		callback(null, {
			place_name,
            lat,
            lon
		});
	})
	.catch(function (error) {
		if(error) {
			callback("Unable to connect location services!")
		} else if(response.data.features.length === 0) {
			callback("Unacl to find location. Try another search.")
		}
	})
	.then(function () {
		// always executed
	});  
}

module.exports = geocode;