import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../features/auth/authSlice";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button, Spinner } from 'react-bootstrap';

export default function FavoriteButton({ movieId }) {
  const dispatch = useDispatch();
  const { user, favoriteStatus } = useSelector(state => state.auth);

  const isFav = user?.FavoriteMovies?.includes(movieId);

  const handleClick = () => {
    dispatch(toggleFavorite(movieId));
  };

  return (
    <Button
      variant='link'
      onClick={handleClick}
      disabled={favoriteStatus === 'loading'} >

      {favoriteStatus === 'loading' ? (<Spinner animation="border" />
      ) : isFav ? (
        <FaHeart color="crimson" />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
}

FavoriteButton.propTypes = {
  movieId: PropTypes.string.isRequired,
};

