// setting up express in project task 2.4
// the code as of right opens now opens said files like instructed in 2.4 
// /documentation, /movies = json, 
const express = require('express');
const app = express();

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
// refactored code.
app.get('/',(req, res) => {
    let responseText = 'Welcome to my app!';
    responseText += '<small>Requested at:' + req.requestTime + '</small>';
    res.send(responseText);
});
/*
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});
*/
app.get('/secreturl', (req, res) => {
    let responseText = 'This is a secret url with super top-secret content.';
    responseText += '<small>Requested at:' + req.requestTime + '</small>';
    res.send(responseText)
    res.send('This is a secret url with super top-secret content.');
});

app.get('/movies',(req, res) => {
    res.json(topMovies);
});


// listen for requests
app.listen(8080,() => {
    console.log('Your app is listening on port 8080.');
});
