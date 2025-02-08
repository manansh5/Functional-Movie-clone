import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favorites = ({ searchQuery }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Favorite Movies</h2>
      {filteredFavorites.length > 0 ? (
        <Row>
          {filteredFavorites.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="mb-4 shadow-lg border-0" // Bootstrap classes for shadow
                onClick={() => navigate(`/details/${movie.id}`)}
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Card Image with Rounded Top Corners */}
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="rounded-top" // Bootstrap class for rounded top
                />

                <Card.Body className="text-center">
                  <Card.Title>{movie.title}</Card.Title>
                  <FavoriteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie);
                    }}
                    style={{
                      cursor: "pointer",
                      color: favorites.some((fav) => fav.id === movie.id) ? "red" : "gray",
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h3 className="text-center text-muted mt-5">No favorite movies found.</h3>
      )}
    </Container>
  );
};

export default Favorites;
