/* 2.8 config mongoose into project */
const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required:  true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

// this will create collections called db.movies and db.users
// 'Movie' --> db.movies
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// exports the models
module.exports.Movie = Movie;
module.exports.User = User;

