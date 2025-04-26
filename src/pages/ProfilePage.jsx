import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Container, Card, ListGroup, Button, Alert, Row, Col } from 'react-bootstrap';
import { updateUser, deleteUser } from '../features/auth/authSlice';
import { getMovies } from '../features/movies/moviesSlice';
import UserForm from '../components/userform/UserForm';
import MovieCard from '../components/moviecard/MovieCard';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, updateStatus, updateError, deleteStatus, deleteError } = useSelector((state) => state.auth);

  const { list: movies, statusAll } = useSelector(state => state.movies);
  const favs = movies.filter(m => user.FavoriteMovies.includes(m._id));

  // Toggle view vs edit
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = formData => {
    dispatch(updateUser(formData)).then(action => {
      if (action.type === 'auth/updateUser/fulfilled') {
        setIsEditing(false);
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      dispatch(deleteUser());
    }
  };

  const forminitialValues = {
    Username: user.Username,
    Password: '',
    Email: user.Email,
    Birthday: user.Birthday.slice(0, 10)
  };

  const isBusy = updateStatus === 'loading';

  // Redirects to login page when deletion succeeds
  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      navigate('/login');
    }
  }, [deleteStatus, navigate]);

  useEffect(() => {
    if (statusAll === 'idle') {
      dispatch(getMovies());
    }
  }, [statusAll, dispatch]);

  return (
    <Container>
      <div>
        <h2>Profile</h2>
        {isEditing ? (
          <Button size='sm' className='mb-2' onClick={() => setIsEditing(false)}
            disabled={isBusy}>
            Cancel
          </Button>
        ) : (
          <div className='mb-2'>
            <Button size='sm' onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
            <Button size='sm' className='ms-2' variant='danger' onClick={handleDelete}
              disabled={deleteStatus === 'loading'}>
              {deleteStatus === 'loading' ? 'Deleting...' : 'Delete Profile'}
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <UserForm
          initialValues={forminitialValues}
          status={updateStatus}
          error={updateError}
          onSubmit={handleUpdate}
          submitLabel={isBusy ? 'Saving...' : 'Save Changes'}
        />
      ) : (
        <Card>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <strong>Username:</strong> {user.Username}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Email:</strong> {user.Email}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Birthday:</strong>{' '}
              {new Date(user.Birthday).toLocaleDateString()}
            </ListGroup.Item>

          </ListGroup>
        </Card>
      )}
      <div className='mt-2' >
        <h3>Your Favorites</h3>
        <Row xs={2} sm={3} md={4}>
          {favs.map(movie => (
            <Col key={movie._id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>

      {updateStatus === 'failed' && (
        <Alert variant='danger'>Update failed: {updateError}</Alert>
      )}

      {deleteStatus === 'failed' && (
        <Alert variant='danger'>Delete failed: {deleteError}</Alert>
      )}
    </Container>
  );
}