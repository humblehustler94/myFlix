/* 2.8 config mongoose into project */
const mongoose = require('mongoose');

// new code added to import the module into models.js 
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
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
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// add hashPassword function
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

// add validatePassword function
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
};


// this will create collections called db.movies and db.users
// 'Movie' --> db.movies
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// exports the models
module.exports.Movie = Movie;
module.exports.User = User;

