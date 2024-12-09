const express = require('express'),
    bodyParser = require('body-parser'), // 2.5
    uuid = require('uuid'); // 2.5

//app.use(bodyParser.json()); // 2.5

// 2.8  integrating mongoose w/ a REST API
// add to the top of your index.js file
const mongoose = require('mongoose'); // 2.8
const Models = require('./models.js'); // 2.8

const Movies = Models.Movie; // 2.8
const Users = Models.User; // 2.8

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); // 2.8


const morgan = require('morgan'); // 2.4
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

let users = [];

let movies = [];


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



// 2.5 CRUD TO PROJECT video notes part 2 
// CREATE -- new users
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

// UPDATE -- user name
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }

})

// CREATE
// adds a movie to favoriteMovies
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieName} has been added to user ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }

})

// DELETE
// deletes a favorite movie from users favoritesMovie list
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }

})


// DELETE -- remove a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        //res.json(users)
        res.status(200).send(` user ${id} has been deleted`);;
    } else {
        res.status(400).send('no such user')
    }

})

// USING EXPRESS STATIC FOR DOCUMENTATION.HTML
app.use(express.static('public'));

// 2.5 CRUD TO PROJECT video notes part 1 
// READ endpoint
// gets all movies 
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// make a READ endpoint
// returns a movie title
app.get('/movies/:title', (req, res) => {
    //const title = req.params.title; // old way
    const { title } = req.params; // creating a new variable title // deconstruced code.
    const movie = movie.find(movie => movie.Tilte === title);

    if (movie) {
        res.status(200).json(movies);
    } else {
        res.status(400).send('no such movie')
    }

})

// make a READ endpoint
// return a genre by name
app.get('/movies/genre/:genreName', (req, res) => {
    //const title = req.params.title; // old way
    const { genreName } = req.params; // creating a new variable title // deconstruced code.
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre; // .get method

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }

})

// make a READ endpoint
// return a directors name
// 
app.get('/movies/directors/:directorName', (req, res) => {
    //const title = req.params.title; // old way
    const { directorName } = req.params; // creating a new variable title // deconstruced code.
    const director = movies.find(movie => movie.Director.Name === directorName).Director; // .get method

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }

})


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