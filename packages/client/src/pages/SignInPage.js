import { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useProvideAuth } from '../hooks/AuthProvider';
import { toast } from 'react-toastify';
import { setAuthToken } from '../utils/api';

const initialState = {
  email: '',
  password: '',
  errorMessage: null,
};

const SignInPage = () => {
  const auth = useProvideAuth();

  const [data, setData] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await auth.signIn(data.email, data.password);
      setAuthToken(res.token);
      navigate('/blogs');
    } catch (error) {
      console.log(error);
      toast.error('invalid credentials.');
      setData({
        ...data,
        errorMessage: error
          ? error.message || error.statusText
          : null,
      });
    }

    // api.post('/auth/signin', data).then((response) => {
    //   // store the authenticated user in local storage
    //   setAuth({ name: response.user.name });
    //   console.log(response);

    //   localStorage.setItem('blogUser', JSON.stringify(response.user));

    //   navigate('/blogs');
    // });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Login</h1>
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
        <Button type="submit" variant="primary">
          Log In
        </Button>
        <Form.Text>
          Don't have an account yet?{' '}
          <Link to="/signup">Register</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignInPage;
