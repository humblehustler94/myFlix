// adding express to my project 2.4
// setting up express with the following code below.
const express = require('express');
const app = express();

// request routing with express
// refactor code from 2.2 for this
// a better way to do this is with express
// add the following code

let topMovies = [
  {
    title: 'The Iron Giant',
    author: ''
  },
  {
    title: 'Fast Five',
    author: ''
  },
  {
    title: 'The Sandlot',
    author: ''
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});


// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});

