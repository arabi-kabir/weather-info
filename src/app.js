const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express()
const port = process.env.PORT || 3000

// Handlebars engine
const viewsPath = path.join(__dirname, '../views/pages')
const partialsPath = path.join(__dirname, '../views/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static file
app.use(express.static(path.join(__dirname, '../public')))

/* Routes */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arabi'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    const place = req.query.address;

    /* Geocoding */
    geocode(place, (error, data) => {
        if(error) return console.log("Error - " + error);

        /* Weather */
        weather(data.lat, data.lon, (error, weather_data) => {
            if(error) return console.log("Error - " + error);

            res.send({
                address: req.query.address,
                forecast: weather_data,
                location: data.place_name
            })
        })
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arabi',
        para: 'There is no help.'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
