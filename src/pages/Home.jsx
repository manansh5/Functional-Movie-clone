import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=d2d8f0d8dce35688c0ac294db163e10b`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [page]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 movie-card">
                <Link to={`/details/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h3 className="text-center">No movies found</h3>
        )}
      </Row>
      <div className="text-center mt-4">
        <Button onClick={() => setPage(page + 1)} variant="primary">Load More</Button>
      </div>
    </Container>
  );
};

export default Home;
