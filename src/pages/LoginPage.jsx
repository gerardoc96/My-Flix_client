import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../features/auth/authSlice';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

export default function LoginPage() {
  // Redux state and actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.auth);

  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Redirect on successful login
  useEffect(() => {
    if (token) navigate('/movies', { replace: true });
  }, [token, navigate]);

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault(); // Prevent browser from reloading the page
    dispatch(login({ username, password }));
  };

  // Renders the form + UI
  return (
    <Container>

      <h2>Log In</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="username" className='mb-2'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className='mb-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading'
            ? <Spinner as="span" /> : 'Log In'}
        </Button>

      </Form>

    </Container>
  );
}