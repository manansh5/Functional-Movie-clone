import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Details = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d2d8f0d8dce35688c0ac294db163e10b`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === movie?.id);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!movie) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <Button variant={isFavorite ? "danger" : "primary"} onClick={toggleFavorite}>
            <FavoriteIcon /> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
