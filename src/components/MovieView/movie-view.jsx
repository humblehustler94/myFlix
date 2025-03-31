import React from "react";

const MovieView = ({ movie, onBack }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} style={{ width: "150px" }} />
      <p>
        <strong>Description:</strong>
        {movie.description}
      </p>
      <p>
        <strong>Genre:</strong>
        {movie.genre}
      </p>
      <p>
        <strong>Director:</strong>
        {movie.director}
      </p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default MovieView;
