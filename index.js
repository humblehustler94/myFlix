// setting up express in project task 2.4
const express = require('express');
// new code 2.4
const morgan = require('morgan');

const app = express();

// new code added 2.4
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


// Morgan middleware --> 2.4
app.use(morgan('combined'));

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

// adding myLogger functions to project
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
}

let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};


app.use(myLogger);
app.use(requestTime);

// GET requests
// simply retrieving data
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

// Static request for documentation --> 2.4 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

// error handling in express --> 2.4
app.use((err, req, res, next) => {
    // logic
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
