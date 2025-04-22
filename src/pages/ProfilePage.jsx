import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, ListGroup, Spinner } from 'react-bootstrap';

export default function ProfilePage() {
  const { user, status } = useSelector((state) => state.auth);

  return (
    <Container>
      <h2>Profile</h2>
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
    </Container>
  );
}