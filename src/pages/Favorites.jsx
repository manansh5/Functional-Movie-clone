import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Favorite Movies</h2>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 shadow movie-card" onClick={() => navigate(`/details/${movie.id}`)}>
                <Card.Img 
                  variant="top" 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  className="movie-img"
                />
                <Card.Body className="text-center">
                  <Card.Title className="movie-title">{movie.title}</Card.Title>
                  <Button 
                    variant="danger" 
                    onClick={(e) => { e.stopPropagation(); removeFromFavorites(movie.id); }}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h3 className="text-center text-muted mt-5">No favorite movies added yet.</h3>
      )}
    </Container>
  );
};

export default Favorites;
