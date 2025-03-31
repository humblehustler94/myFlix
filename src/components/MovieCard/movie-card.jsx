import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie) return null; // Prevents errors if movie is undefined

  return (
    <div
      onClick={() => onMovieClick && onMovieClick(movie)} // Ensuring function exists before calling
      style={{
        border: "1px solid black",
        padding: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      role="button" // Improves accessibility
      aria-label={`View details for ${movie.Title}`} // Use correct API property
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      <h2>{movie.Title}</h2> {/* Use correct API property */}
    </div>
  );
};

// PropTypes for validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure `_id` exists for key usage
    Title: PropTypes.string.isRequired, // Ensure `Title` is used correctly
  }).isRequired,
  onMovieClick: PropTypes.func,
};

export default MovieCard;
