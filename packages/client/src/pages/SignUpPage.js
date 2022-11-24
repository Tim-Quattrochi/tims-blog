import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const [data, setData] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/auth/signup', data).then((response) => {
      // store the authenticated user in state
      localStorage.setItem('blogUser', JSON.stringify(response));
      navigate('/blogs');
    });
  };
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Register</h1>
      <Form
        className="row"
        style={{ width: '50%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Form.Text>
          Already have an account? <Link to="/signin">Log in</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignUpPage;
