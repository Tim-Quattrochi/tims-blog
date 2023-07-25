import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/AuthProvider";
import { setAuthToken } from "../utils/api";

const initialState = {
  email: "",
  password: "",
  errorMessage: null,
  touched: false,
  loading: false,
};

const SignInPage = () => {
  const auth = useProvideAuth();
  const [data, setData] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      touched: true,
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setData({ ...data, loading: true });
    try {
      const res = await auth.signIn(data.email, data.password);
      setAuthToken(res.token);
      navigate("/blogs");
    } catch (error) {
      setData({
        ...data,
        loading: false,
        errorMessage: error.message,
      });
    }
    setData(initialState);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Login</h1>
      <Form
        className="row"
        style={{ width: "50%", maxWidth: "400px" }}
        noValidate
        validated
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            name="email"
            isInvalid={data.email.length < 5}
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            isValid={data.password.length > 7 && data.touched}
            isInvalid={data.password.length < 7}
            autoComplete="current-password"
            value={data.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        {data.loading ? (
          <Button variant="primary">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          <Button type="submit" variant="primary">
            Log In
          </Button>
        )}

        <Alert
          hidden={!data.errorMessage}
          variant="danger"
          style={{
            margin: "5px auto 0 auto",
            width: "20rem",
            padding: "2px",
            textAlign: "center",
          }}
        >
          {data.errorMessage ? data.errorMessage : null}
        </Alert>
        <Form.Text>
          Don't have an account yet?{" "}
          <Link to="/signup">Register</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignInPage;
