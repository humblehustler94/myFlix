const express = require('express'),
    morgan = require('morgan');
const app = express();

// 2.8  integrating mongoose w/ a REST API
// add to the top of your index.js file
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Movie list 2.4
// add 10 movies and year released.
let topMovies = [

    {
        title: 'Instructions Not Included',
        year: '2013'
    },
    {
        title: 'Mighty Joe Young',
        year: '1998'
    },
    {
        title: 'The Iron Giant',
        year: '1999'
    },
    {
        title: 'Fast Five',
        year: '2011'
    },
    {
        title: 'The Breakfast Club',
        year: '1985'
    },
    {
        title: 'The Sandlot',
        year: '1993'
    },
    {
        title: 'Blade',
        year: '1998'
    },
    {
        title: 'Edward Scissorhands',
        year: '1990'
    },
    {
        title: 'Transformers',
        year: '2007'
    },
    {
        title: 'Grease',
        year: '1978'
    },

];

// ADD middleware function: myLogger to project.
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};
// ADD middleware function: requestTime to project.
let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

// add this line after middleware
app.use(myLogger);
app.use(requestTime);

// APP USING MORGAN
app.use(morgan('common'));


// USING EXPRESS STATIC FOR DOCUMENTATION.HTML
app.use(express.static('public'));


// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: 'public' });
});

app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// ADD MIDDLEWEAR FUNCTION : ERROR-HANDLING 
app.use((err, req, res, next) => {
    // logic
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});