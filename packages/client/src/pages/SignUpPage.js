import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setAuthToken } from '../utils/api';
import { useProvideAuth } from '../hooks/AuthProvider';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const [data, setData] = useState(initialState);
  const auth = useProvideAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, name } = data;
    try {
      console.log(data);
      const res = await auth.signUp(
        //the order of these must match the back end
        email,
        name,
        password,
        confirmPassword
      );
      // store the authenticated user in state
      setAuthToken(res.token);

      localStorage.setItem('blogUser', JSON.stringify(res.user));
      navigate('/blogs');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Register</h1>
      <Form
        className="row"
        style={{ width: '50%', maxWidth: '400px' }}
        onSubmit={handleSignup}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>
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
