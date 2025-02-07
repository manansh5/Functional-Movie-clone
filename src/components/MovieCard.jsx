import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"; 

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-3 mb-4">
      <Card className="bg-dark text-white" onClick={() => navigate(`/details/${movie.id}`)}>
        <Card.Img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;