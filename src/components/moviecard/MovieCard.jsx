import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FavoriteButton from '../favoritebutton/FavoriteButton';
import { Link } from 'react-router';

export default function MovieCard({ movie, variant = 'card' }) {
  const [showGenre, setShowGenre] = useState(false);
  const [showDirector, setShowDirector] = useState(false);

  return (
    <Card className={'shadow-sm mb-2 mt-2'} variant='card'>
      <Card.Img
        variant='top'
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
      />
      <Card.Body>

        <Card.Title className='d-flex justify-content-between align-items-center'>
          <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>{movie.Title}</Link>
          <FavoriteButton movieId={movie._id} />
        </Card.Title>

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
  variant: PropTypes.oneOf(['card', 'detail']),
};