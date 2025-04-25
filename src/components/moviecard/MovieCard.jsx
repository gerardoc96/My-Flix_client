import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FavoriteButton from '../favoritebutton/FavoriteButton';
import { Link } from 'react-router';

export default function MovieCard({ movie, variant = 'card' }) {
  const [showGenre, setShowGenre] = useState(false);
  const [showDirector, setShowDirector] = useState(false);

  return (
    <Card className={variant === 'small' ? 'h-100' : ''}>
      <Card.Img src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>

        <Card.Title>
          <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>{movie.Title}</Link>
        </Card.Title>

        <FavoriteButton movieId={movie._id} />

        {variant === 'detail' && (
          <>
            <Card.Text>{movie.Description}</Card.Text>

            <h5>
              Genre:{' '}
              <Button variant="link" onClick={() => setShowGenre(!showGenre)}>
                {movie.Genre.Name}
              </Button>
            </h5>
            <Collapse in={showGenre}>
              <div>{movie.Genre.Description}</div>
            </Collapse>

            <h5>
              Director:{' '}
              <Button variant="link" onClick={() => setShowDirector(!showDirector)}>
                {movie.Director.Name}
              </Button>
            </h5>
            <Collapse in={showDirector}>
              <div>
                <p><strong>Bio:</strong> {movie.Director.Bio}</p>
                <p><strong>Born:</strong> {movie.Director.Birth}</p>
                <p><strong>Died:</strong> {movie.Director.Death}</p>
              </div>
            </Collapse>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(['card', 'detail', 'small']),
};