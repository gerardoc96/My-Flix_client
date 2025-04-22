import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { signup } from '../features/auth/authSlice';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupStatus, signupError } = useSelector(state => state.auth);

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  // Redirect to login page after successful signup
  useEffect(() => {
    if (signupStatus === 'succeeded') {
      navigate('/login', { replace: true });
    }
  }, [signupStatus, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup({ Username, Password, Email, Birthday }));
  };

  return (
    <Container>
      <h2>Sign Up</h2>

      {signupStatus === 'failed' && (
        <Alert variant="danger">{signupError}</Alert>
      )}

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={Username}
            minLength={5}
            onChange={e => setUsername(e.target.value)}
            placeholder='At least 5 alphabetic characters'
            required
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={Password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={Email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='birthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            value={Birthday}
            onChange={e => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type='submit'
          disabled={signupStatus === 'loading'} >
          {signupStatus === 'Loading'
            ? <Spinner as='span' animation='border' size='sm' /> : 'Sign Up'}
        </Button>

      </Form>

      <p>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>

    </Container>
  );
}