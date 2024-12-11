const express = require('express'),
    bodyParser = require('body-parser'), // 2.5
    uuid = require('uuid'); // 2.5

const morgan = require('morgan'); // 2.4

// 2.8  integrating mongoose w/ a REST API
// add to the top of your index.js file
const mongoose = require('mongoose'); // 2.8
const Models = require('./models.js'); // 2.8

const Movies = Models.Movie; // 2.8
const Users = Models.User; // 2.8

mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); // 2.8


const app = express();
// inserted after const app = express();
// add these lines if using versions of express above 4.16 to import body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// comment out no longer needed.
// Movie list 2.4
// add 10 movies and year released.
/*
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
*/

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

app.use(bodyParser.json()); // 2.5

// APP USING MORGAN
app.use(morgan('common'));

// GET requests
// DEFAULT
//  http://localhost:8080/ --> Welcome to my app!

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

// might no longer need this code line below.
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: 'public' });
});

// http://localhost:8080/secreturl --> This is a secret url with super top-secret content. displayed in DOM.
app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});

// REFACTOR CODE 2.8
// READ endpoint : get all movies
// READ IN MONGOOSE 2.8
// ADDING CODE : 2
// http://localhost:8080/movies --> results mongoDB movies prev task 2.7 
// returns all 10 movies

app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
});

// READ endpoint : Get all users 
// READ IN MONGOOSE 2.8
// ADDING CODE : 3
// http://localhost:8080/users --> results mongoDB users prev task 2.7
// returns all 4 users
// code 3

app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error:' + err);
        })
})

// READ endpoint : Get a user by username
// READ IN MONGOOSE 2.8
// ADDING CODE: 4 
// http://localhost:8080/users/:Username --> results mongoDB users prev task 2.7
// http://localhost:8080/users/johndoe 
// returns 1 user "johndoe"

app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});

// 2.5 CRUD TO PROJECT video notes part 2 
// CREATE -- new users
//  ADD A USER 
/* WE'LL EXCEPT JSON IN THIS FORMAT
{
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
}
*/

/*
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
*/

// CREATE IN MONGOOSE 2.8
// refactor the following code
// ADDING CODE - 1 ADD A USER
// body --> raw --> enter in Username, Password --> results in error asks for Email to Path --> ref MOCK 4 img.
// add email results are MOCK 5 img.

app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error:' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error:' + error);
        });
    //res.send('Successful POST request creating a new user');
});


// UPDATE -- user 
// 
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