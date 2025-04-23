import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, ListGroup, Button, } from 'react-bootstrap';
import { updateUser } from '../features/auth/authSlice';
import UserForm from '../components/userform/UserForm';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, updateStatus, updateError } = useSelector((state) => state.auth);

  // Toggle view vs edit
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = formData => {
    dispatch(updateUser(formData)).then(action => {
      if (action.type === 'auth/updateUser/fulfilled') {
        setIsEditing(false);
      }
    });
  };

  const forminitialValues = {
    Username: user.Username,
    Password: '',
    Email: user.Email,
    Birthday: user.Birthday.slice(0, 10)
  };

  const isBusy = updateStatus === 'loading';

  return (
    <Container>
      <div>
        <h2>Profile</h2>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}
            disabled={isBusy}>
            Cancel
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
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

      {updateStatus === 'failed' && (
        <div>
          <p>Error: {updateEror}</p>
        </div>
      )}
    </Container>
  );
}