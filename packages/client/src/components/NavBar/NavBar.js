import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProvideAuth } from "../../hooks/AuthProvider";
import "./navBar.css";

const NavBar = () => {
  const [returningUser, setReturningUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useProvideAuth();
  const location = useLocation();

  const {
    state: { isAuthenticated },
  } = useProvideAuth();

  const logOut = () => {
    setIsLoggedIn(false);
    auth.signOut();
  };

  useEffect(() => {
    //check local storage to see if returning user
    const localUser = JSON.parse(localStorage.getItem("blogUser"));

    if (localUser) {
      setIsLoggedIn(true);
      setReturningUser(localUser.name);
    }
  }, []);

  const getActiveLinkStyle = (pathname) => {
    return {
      fontWeight: pathname === location.pathname ? "bold" : "normal",
      color: pathname === location.pathname ? "white" : "#C0C0C0",
      textDecoration: "none",
    };
  };

  return (
    <Navbar className="nav">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={getActiveLinkStyle("/")}
        >
          Blog Talk
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "white" }}>
            {isAuthenticated && `${auth.state.user.name}'s Blog`}
          </Navbar.Text>
        </Navbar.Collapse>
        <Nav className="mx-4">
          <Nav.Link
            as={NavLink}
            to="/blogs"
            style={getActiveLinkStyle("/blogs")}
          >
            All Blogs
          </Nav.Link>
          {isAuthenticated ? (
            <Nav.Link
              as={NavLink}
              to="/blogs/create"
              style={getActiveLinkStyle("/blogs/create")}
            >
              Create Blog
            </Nav.Link>
          ) : (
            ""
          )}
          {isAuthenticated ? (
            <Nav.Link
              onClick={logOut}
              as={NavLink}
              to="/signin"
              style={getActiveLinkStyle("/signin")}
            >
              Log Out
            </Nav.Link>
          ) : (
            <>
              <Nav.Link
                as={NavLink}
                to="/signin"
                style={getActiveLinkStyle("/signin")}
              >
                Log In
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/signup"
                style={getActiveLinkStyle("/signup")}
              >
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
