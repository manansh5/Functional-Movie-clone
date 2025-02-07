import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
 import { BASE_URL, API_KEY } from "../utils/config";



const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMovie(data);

        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(savedFavorites.some((fav) => fav.id === data.id));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...savedFavorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!movie) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg">
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="img-fluid rounded"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </Card>
        </Col>
        <Col md={6} lg={8}>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.overview}</Card.Text>
            <Card.Text><strong>Release Date:</strong> {movie.release_date}</Card.Text>
            <Button variant={isFavorite ? "secondary" : "danger"} onClick={toggleFavorite}>
              <FavoriteIcon /> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
