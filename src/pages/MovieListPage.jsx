import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../components/moviecard/MovieCard';

export default function MovieListPage() {
  const dispatch = useDispatch();
  const { list: movies, statusAll, errorAll, searchTerm } = useSelector(state => state.movies);

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
        <Alert variant="danger">{errorAll}</Alert>
      </Container>
    );
  }

  //Case-insentitive filter
  const filteredMovies = movies.filter(
    movie => movie.Title.toLowerCase().includes(
      searchTerm.toLowerCase()
    ));

  return (
    <Container >

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredMovies.map(movie => (

          <Col key={movie._id}>
            <MovieCard movie={movie} variant="card" />
          </Col>
        ))}
      </Row>
      {filteredMovies.length === 0 && (
        <p>No movies found for "{searchTerm}".</p>
      )}
    </Container>
  );
}