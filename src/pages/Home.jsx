import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";


const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const restrictedKeywords = ["porn", "xxx", "adult", "erotic", "nude", "sex", "explicit", "18+"]; 

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=d2d8f0d8dce35688c0ac294db163e10b`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const filteredResults = data.results.filter(
          (movie) =>
            !restrictedKeywords.some((word) => movie.title.toLowerCase().includes(word)) &&
            movie.poster_path !== null
        );

        setMovies((prevMovies) => [...prevMovies, ...filteredResults]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 position-relative shadow border-0 movie-card">
                <Link to={`/details/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-top"
                  />
                </Link>
                <Card.Body className="text-center">
                  <Card.Title>{movie.title}</Card.Title>
                  <FavoriteIcon
                    onClick={() => toggleFavorite(movie)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      fontSize: "1.8rem",
                      color: favorites.some((fav) => fav.id === movie.id) ? "red" : "gray",
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h3 className="text-center">No movies found</h3>
        )}
      </Row>

      {loading && <h5 className="text-center my-4">Loading more movies...</h5>}

      <style>
        {`
          .movie-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border-radius: 35px;
          }
          .movie-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </Container>
  );
};

export default Home;
