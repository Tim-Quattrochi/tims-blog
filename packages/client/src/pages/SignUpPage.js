import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/api";
import { useProvideAuth } from "../hooks/AuthProvider";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
  touched: false,
  loading: false,
};

const SignUpPage = () => {
  const [data, setData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const auth = useProvideAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      touched: true,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { email, password, confirmPassword, name } = data;

    if (password !== confirmPassword) {
      return setData({
        ...data,
        error: "Passwords must match.",
      });
    }

    setData({ ...data, loading: true });
    try {
      const res = await auth.signUp(
        //the order of these must match the back end
        email,
        name,
        password,
        confirmPassword
      );
      // store the authenticated user in state
      setAuthToken(res.token);

      localStorage.setItem("blogUser", JSON.stringify(res.user));
      navigate("/blogs");
    } catch (error) {
     
      setData({
        ...data,
        loading: false,
        error: error.message,
      });
    }
    setValidated(true);
    setData(initialState);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Register</h1>
      <Form
        className="row"
        style={{ width: "350px", maxWidth: "400px" }}
        noValidate
        validated={validated}
        onSubmit={handleSignup}
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            isValid={data.name.length > 3}
            type="text"
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            autoComplete="new-password"
            isInvalid={data.touched && data.password.length < 7}
            value={data.password}
            onChange={handleChange}
          />
          {data.password.length < 7 && data.password !== "" ? (
            <Form.Control.Feedback type="invalid">
              Password must be at least 7 characters.
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={data.confirmPassword}
            onChange={handleChange}
            isValid={
              data.confirmPassword === data.password && data.touched
            }
            isInvalid={
              data.confirmPassword !== data.password &&
              data.confirmPassword !== "" &&
              data.touched
            }
          />
          {data.confirmPassword !== data.password &&
          data.confirmPassword !== "" ? (
            <Form.Control.Feedback type="invalid">
              Passwords don't match.
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
          )}
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
            Register
          </Button>
        )}
        <Alert
          hidden={!data.error}
          variant="danger"
          style={{
            margin: "5px auto 0 auto",
            width: "20rem",
            padding: "2px",
            textAlign: "center",
          }}
        >
          {data.error ? data.error : null}
        </Alert>
        <Form.Text>
          Already have an account? <Link to="/signin">Log in</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignUpPage;
