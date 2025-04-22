import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router';

export default function MovieListPage() {
  const dispatch = useDispatch();
  const { list: movies, statusAll, errorAll } = useSelector(state => state.movies);

  useEffect(() => {
    if (statusAll === 'idle') {
      dispatch(getMovies());
    }
  }, [statusAll, dispatch]);

  if (statusAll === 'loading') {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (statusAll === 'failed') {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container >

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {movies.map(movie => (

          <Col key={movie._id}>
            <Card>

              <Link to={`/movies/${movie.Title}`}>
                <Card.Img
                  src={movie.ImagePath}
                  alt={movie.Title}
                />
              </Link>

              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
              </Card.Body>

            </Card>
          </Col>

        ))}
      </Row>

    </Container>
  );
}