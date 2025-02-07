import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Details = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_TMDB_API_KEY`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <Button variant="contained" color="primary">
        <FavoriteIcon /> Add to Favorites
      </Button>
    </div>
  );
};

export default Details;
