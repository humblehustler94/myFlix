import React, { useState, useEffect } from "react";
import { LoginView } from "../LoginView/login-view"; // 3.5 new code line added.
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { SignupView } from "../SignupView/signup-view";

const MainView = () => {
  const [movies, setMovies] = useState([]); // set initial value of movies to an empty array and add setMovies function 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null); // 3.5 new code line added.
  const [token, setToken] = useState(null); // 3.5 new code line added.
  const [error, setError] = useState(""); // 3.5 new code line added.

  // Persistent login check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Fetch movies when token is available 
  useEffect(() => {
    if (!token) return;

    fetch("https://movies-flixx-19a7d58ab0e6.herokuapp.com/movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          handleLogout();
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movies from API:", data);
        setMovies(data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Could not fetch movies. Please try again.");
      });
  }, [token]);

  // Logout and clear data function
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // handle successful login
  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // Render login or signup view if not logged in
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={handleLogin} />
        {/* Consider a signup toggle here */}
         <SignupView onSignedUp={handleSignup} /> 
      </>
    );
  }


  // Render movies list or selected movie
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(null)}
        />
      ) : (
        <div>
          <h1>Movies List</h1>
          {movies.length === 0 ? (
            <p>No movies available.</p>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainView;
