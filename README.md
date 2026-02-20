# 🚀 myFlix API

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/humblehustler94/myFlix?style=for-the-badge)](https://github.com/humblehustler94/myFlix/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/humblehustler94/myFlix?style=for-the-badge)](https://github.com/humblehustler94/myFlix/network)
[![GitHub issues](https://img.shields.io/github/issues/humblehustler94/myFlix?style=for-the-badge)](https://github.com/humblehustler94/myFlix/issues)
<!--[![GitHub license](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)](LICENSE) -->

**A robust backend API for a movie application, providing comprehensive data on movies, genres, and directors, alongside secure user management and personalized favorite lists.**

[Live Demo](https://movies-flixx-19a7d58ab0e6.herokuapp.com/) 

</div>

## 📖 Overview

The myFlix API serves as the powerful backend for a feature-rich movie application, enabling users to explore a vast catalog of films, manage their profiles, and curate personalized lists of favorite movies. Built with Node.js and Express, it offers secure user authentication and a well-structured set of RESTful endpoints to interact with movie data stored in a MongoDB database.

This API is designed for developers looking to integrate a comprehensive movie database and user management system into their frontend applications, providing all necessary functionalities from user registration to personalized movie lists.

## ✨ Features

-   **🎬 Movie Catalog:** Retrieve a list of all movies, or search for specific movies by title.
-   **🎭 Genre & Director Details:** Explore movies by genre or director, and access detailed information about each genre and director.
-   **🔐 User Authentication:** Secure user registration, login, and profile management using Passport.js and JSON Web Tokens (JWT).
-   **⭐ Favorite Movies:** Users can add and remove movies from their personalized list of favorites.
-   **👤 User Profile Management:** Update user details or delete user accounts securely.
-   **🚀 RESTful API:** Intuitive and well-structured API endpoints for easy integration.
-   **🛡️ Robust Security:** Password hashing with `bcrypt` and JWT for secure session management.
-   **✅ Data Validation:** Input validation for user registration and updates using `express-validator`.
-   **📈 Request Logging:** HTTP request logging using `morgan` for development and debugging.

## 🛠️ Tech Stack

**Backend:**
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white)](http://www.passportjs.org/)
[![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-A57E37?style=for-the-badge&logo=bcrypt&logoColor=white)](https://www.npmjs.com/package/bcrypt)
[![Express Validator](https://img.shields.io/badge/Express_Validator-2C3E50?style=for-the-badge&logo=npm&logoColor=white)](https://express-validator.github.io/docs/)
[![CORS](https://img.shields.io/badge/CORS-FF69B4?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/cors)
[![Morgan](https://img.shields.io/badge/Morgan-795548?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/morgan)

**Database:**
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

**DevOps:**
[![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://www.heroku.com/) <!-- TODO: Confirm deployment platform -->

## 🚀 Quick Start

Follow these steps to get the myFlix API up and running on your local machine.

### Prerequisites
-   **Node.js**: `v14.0.0` or higher
-   **npm**: Comes with Node.js
-   **MongoDB**: A running MongoDB instance (local or cloud-hosted via MongoDB Atlas).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/humblehustler94/myFlix.git
    cd myFlix
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment setup**
    Create a `.env` file in the root directory (based on standard practice, though not explicitly present in analysis).
    ```bash
    touch .env
    ```
    Configure your environment variables in `.env`:
    ```
    PORT=8080
    CONNECTION_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
    JWT_SECRET="YOUR_JWT_SECRET_KEY"
    ```
    Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB connection details. `JWT_SECRET` should be a strong, random string.

4.  **Database setup**
    The API uses Mongoose to connect to MongoDB. Ensure your MongoDB instance is running and reachable via the `CONNECTION_URI` provided in the `.env` file. No explicit migration commands are needed; Mongoose handles schema creation on first use.

5.  **Start development server**
    ```bash
    npm start
    ```
    Or for development with automatic restarts:
    ```bash
    npm run dev
    ```

6.  **Access the API**
    The API will be running at `http://localhost:[PORT]` (default `http://localhost:8080`).

## 📁 Project Structure

```
myFlix/
├── .gitignore          # Specifies intentionally untracked files to ignore
├── auth.js             # Handles user authentication and JWT token generation
├── docs/               # Placeholder for API documentation
├── index.js            # Main entry point for the Express application, defines all API routes
├── log.txt             # Logs HTTP request information (configured via morgan)
├── models.js           # Defines Mongoose schemas for User, Movie, Genre, and Director
├── package-lock.json   # Records the exact dependency tree
├── package.json        # Project metadata and dependency list
├── passport.js         # Configures Passport.js strategies (Local and JWT)
└── public/             # Serves static files
```

## ⚙️ Configuration

### Environment Variables
The application relies on environment variables for sensitive information and configuration.

| Variable       | Description                                                 | Default | Required |
|----------------|-------------------------------------------------------------|---------|----------|
| `PORT`         | The port the Express server will listen on.                 | `8080`  | No       |
| `CONNECTION_URI` | MongoDB connection string.                                  | -       | Yes      |
| `JWT_SECRET`   | Secret key used for signing and verifying JWTs.             | -       | Yes      |

### Configuration Files
-   **`package.json`**: Defines project scripts and dependencies.
-   **`.env`**: (User-created) Stores environment-specific variables like database connection strings and secrets.

## 🔧 Development

### Available Scripts
| Command       | Description                                                |
|---------------|------------------------------------------------------------|
| `npm start`   | Starts the Express API server in production mode.          |
| `npm run dev` | Starts the Express API server with `nodemon` for development (auto-restarts on file changes). |
| `npm test`    | Placeholder for running tests. (Currently outputs an error) |

## 📚 API Reference

The myFlix API is a RESTful service providing endpoints for movie information and user management. All endpoints require authentication unless specified.

### Authentication

Authentication is handled using **JSON Web Tokens (JWT)**.
1.  **Register a User**: Make a `POST` request to `/users` with username, password, email, and birthday.
2.  **Login**: Make a `POST` request to `/login` with username and password. Upon successful login, the API will return a JWT.
3.  **Access Protected Endpoints**: Include the JWT in the `Authorization` header of subsequent requests:
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```

### Endpoints

#### User Endpoints

-   **`POST /users`**
    -   **Description**: Registers a new user.
    -   **Request Body**: `{ Username, Password, Email, Birthday }`
    -   **Returns**: New user object.

-   **`POST /login`**
    -   **Description**: Authenticates a user and issues a JWT.
    -   **Request Body**: `{ Username, Password }`
    -   **Returns**: User object and a JWT.

-   **`PUT /users/:username`**
    -   **Description**: Updates a user's information. Requires JWT.
    -   **Parameters**: `username` (path)
    -   **Request Body**: `{ Username, Password, Email, Birthday }` (any or all fields)
    -   **Returns**: Updated user object.

-   **`DELETE /users/:username`**
    -   **Description**: Deletes a user account. Requires JWT.
    -   **Parameters**: `username` (path)
    -   **Returns**: Success message.

-   **`POST /users/:username/movies/:movieId`**
    -   **Description**: Adds a movie to a user's list of favorite movies. Requires JWT.
    -   **Parameters**: `username` (path), `movieId` (path)
    -   **Returns**: Updated user object with new favorite movie.

-   **`DELETE /users/:username/movies/:movieId`**
    -   **Description**: Removes a movie from a user's list of favorite movies. Requires JWT.
    -   **Parameters**: `username` (path), `movieId` (path)
    -   **Returns**: Updated user object without the removed favorite movie.

#### Movie Endpoints

-   **`GET /movies`**
    -   **Description**: Retrieves all movies. Requires JWT.
    -   **Returns**: Array of movie objects.

-   **`GET /movies/:title`**
    -   **Description**: Retrieves details for a specific movie by its title. Requires JWT.
    -   **Parameters**: `title` (path)
    -   **Returns**: Movie object.

-   **`GET /movies/genres/:genreName`**
    -   **Description**: Retrieves movies filtered by a specific genre name. Requires JWT.
    -   **Parameters**: `genreName` (path)
    -   **Returns**: Array of movie objects belonging to the genre.

-   **`GET /movies/directors/:directorName`**
    -   **Description**: Retrieves movies filtered by a specific director's name. Requires JWT.
    -   **Parameters**: `directorName` (path)
    -   **Returns**: Array of movie objects directed by the director.

#### Genre Endpoints

-   **`GET /genres`**
    -   **Description**: Retrieves all genres. Requires JWT.
    -   **Returns**: Array of genre objects.

-   **`GET /genres/:genreName`**
    -   **Description**: Retrieves details for a specific genre by name. Requires JWT.
    -   **Parameters**: `genreName` (path)
    -   **Returns**: Genre object.

#### Director Endpoints

-   **`GET /directors`**
    -   **Description**: Retrieves all directors. Requires JWT.
    -   **Returns**: Array of director objects.

-   **`GET /directors/:directorName`**
    -   **Description**: Retrieves details for a specific director by name. Requires JWT.
    -   **Parameters**: `directorName` (path)
    -   **Returns**: Director object.

## 🤝 Contributing

We welcome contributions! If you're interested in improving the myFlix API, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

### Development Setup for Contributors
The development setup is the same as the Quick Start guide. Ensure you have Node.js and MongoDB configured locally.

<!--
## 📄 License

This project is licensed under the [ISC License](LICENSE) - see the [LICENSE](LICENSE) file for details. <!-- TODO: Add actual LICENSE file content if not present -->

## 🙏 Acknowledgments

-   **Express.js**: For providing a robust web framework.
-   **Mongoose**: For elegant MongoDB object modeling.
-   **Passport.js**: For flexible authentication strategies.
-   **bcrypt**: For secure password hashing.
-   **jsonwebtoken**: For secure token-based authentication.
-   **express-validator**: For powerful request body validation.

## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/humblehustler94/myFlix/issues)
-   👤 Author: [humblehustler94](https://github.com/humblehustler94)
-   📧 Email: [flores.itzel94@gmail.com]

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Made with ❤️ by humblehustler94**

</div>
