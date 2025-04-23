import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

export default function UserForm({
  initialValues,
  status,
  error,
  onSubmit,
  submitLabel,
}) {
  const [formData, setFormData] = useState(initialValues);

  //Reset local form when initialValues change
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((Data) => ({ ...Data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="Username"
          type="text"
          value={formData.Username}
          onChange={handleChange}
          minLength={5}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="Password"
          type="password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="Email"
          type="email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="birthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          name="Birthday"
          type="date"
          value={formData.Birthday}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading'
          ? <Spinner as="span" animation="border" size="sm" />
          : submitLabel}
      </Button>

    </Form>
  );
}

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string
  }).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired
};