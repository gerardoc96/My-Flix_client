import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../features/movies/moviesSlice";
import { Container, Row, Col, Card, Button, Collapse, Spinner, Alert } from "react-bootstrap";

export default function MovieDetailsPage() {
  const { Title } = useParams();
  const dispatch = useDispatch();

  const {
    currentMovie: movie,
    statusOne: status,
    errorOne: error
  } = useSelector((state) => state.movies);

  // toggle for Director & Genre
  const [showGenre, setShowGenre] = useState(false);
  const [showDirector, setShowDirector] = useState(false);

  useEffect(() => {
    dispatch(getMovie(Title));
  }, [dispatch, Title]);

  if (status === 'Loading') {
    return (
      <Container>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container>
        <Alert variant="danger">
          {error || "Could not fetch the movie"}
        </Alert>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Container>

      <Row>

        <Col>
          <Card>
            <Card.Img src={movie.ImagePath} alt={movie.Title} />
          </Card>
        </Col>

        <Col>
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>

          {/* Genre toggle */}
          <h5>
            Genre: {''}
            <Button
              variant='link'
              onClick={() => setShowGenre(!showGenre)} >
              {movie.Genre.Name}
            </Button>
          </h5>

          <Collapse in={showGenre}>
            <div>
              <p>{movie.Genre.Description}</p>
            </div>
          </Collapse>

          {/* Director toggle */}
          <h5>
            Director: {''}
            <Button
              variant='link'
              onClick={() => setShowDirector(!showDirector)} >
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

        </Col>
      </Row>
    </Container>
  )
}