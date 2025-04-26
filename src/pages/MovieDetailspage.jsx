import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../features/movies/moviesSlice";
import { Container, Spinner, Alert } from "react-bootstrap";
import MovieCard from "../components/moviecard/MovieCard";

export default function MovieDetailsPage() {
  const { Title } = useParams();
  const dispatch = useDispatch();

  const {
    currentMovie: movie,
    statusOne: status,
    errorOne: error
  } = useSelector(state => state.movies);

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
      <MovieCard movie={movie} variant="detail" />
    </Container>
  )
}