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


let auth = require('./auth')(app); // import auth.js file into project 2.9
// add the following code after 
const passport = require('passport');
require('./passport');



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

let users = [];

// CODE HERE FOR ---> app.use 
app.use(myLogger);
app.use(requestTime);
app.use(bodyParser.json()); // 2.5
app.use(morgan('common')); // APP USING MORGAN

// USING EXPRESS STATIC FOR DOCUMENTATION.HTML
app.use(express.static('public'));


// GET root requests in project --> 2.4
// http://localhost:8080/ --> default
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

// http://localhost:8080/secreturl --> This is a secret url with super top-secret content. displayed in DOM.
app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});

// READ IN MONGOOSE : Get all movies
// READ endpoint : http://localhost:8080/movies
// refactored code : return all movies from MongoDB 
/*
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
*/


// applying JWT  authentication to a specific endpoint 
// refactor the following code 2.9
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
});


// READ IN MONGOOSE : Get all users 
// READ endpoint : http://localhost:8080/users --> results mongoDB users from prev task 2.7
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

// READ IN MONGOOSE : Get a user by username : CODE 4 --> 2.8
// READ endpoint : http://localhost:8080/users/flores
// returns 1 user "flores"
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
});

// READ IN MONGOOSE : Get a movie by title
// READ endpoint : http://localhost:8080/movies/Inception
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
});

// READ IN MONGOOSE : return a genre by name 
// Mongoose function for "finding" movie data for movies with a genre of "Thriller"
// READ endpoint : http://localhost:8080/movies/genre/Thriller
app.get('/movies/genre/:genreName', (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.genreName })
        .then((movie) => res.json(movie.Genre))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });

});

// READ IN MONGOOSE : get a directors information ()
// READ endpoint : http://localhost:8080/movies/directors/Christopher%20Nolan
app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne({ "Director.Name": req.params.directorName })
        .then((movie) => res.json(movie.Director))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });

});

// CREATE -- new users
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

// CREATE IN MONGOOSE : Add a new user : CODE 1 --> 2.8
// CREATE endpoint : http://localhost:8080/users
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
});

// UPDATE IN MONGOOSE : Update a user by username / update a user's information : CODE 5 --> 2.8
// UPDATE endpoint : http://localhost:8080/users/flores 
/* we'll expect JSON in this format
{
Username: String,
(required)
Password: String,
(required)
Email: String,
(required)
Birthday: Date
}*/
// refactor code 2.9 
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // condition to check added here
    if (req.user.Username !== req.params.Username) {
        return res.status(400).send('Permission denied');
    }
    // condition ends 
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }) // THIS LINE MAKES SURE THAT THE UPDATE DOCUMENT IS RETURNED
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        })
});


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


// MONGOOSE - add a movie to a users favoriteMovies
// POST endpoint - http://localhost:8080/users/flores/movies/674f6e99130c43c583893bfe
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: { FavoriteMovies: req.params.MovieID } },
        { new: true }
    )
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
});


// ------------------------------------ >   DO I DELETE THIS commnent out code? 
// CREATE
// adds a movie to favoriteMovies
/*
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
*/


// DELETE IN MONGOOSE : deletes a favorite movie from users favritesMovies list 
// DELETE endpoint : http://localhost:8080/users/flores/movies/674f6e99130c43c583893bfe
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true }
    )
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
});

/*
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
*/


/*
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
*/


// DELETE IN MONGOOSE : Delete a user by username
// DELETE endpoint : http://localhost:8080/user/flores
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
});



// ADD MIDDLEWEAR FUNCTION : ERROR-HANDLING 
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