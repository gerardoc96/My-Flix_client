import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { signup } from '../features/auth/authSlice';
import { Container, Alert } from 'react-bootstrap';
import UserForm from '../components/userform/UserForm';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupStatus, signupError } = useSelector(state => state.auth);

  // Redirect to login page after successful signup
  useEffect(() => {
    if (signupStatus === 'succeeded') {
      navigate('/login', { replace: true });
    }
  }, [signupStatus, navigate]);

  // Sets initial values as empty
  const initialValues = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  // Handles form submission
  const handleSubmit = (formData) => {
    dispatch(signup(formData));
  };

  return (
    <Container>
      <h2>Sign Up</h2>

      {signupStatus === 'failed' && (
        <Alert variant="danger">{signupError}</Alert>
      )}

      {/* Reusable user form */}
      <UserForm
        initialValues={initialValues}
        status={signupStatus}
        error={signupError}
        onSubmit={handleSubmit}
        submitLabel="Sign Up"
      />

      <p>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>

    </Container>
  );
}