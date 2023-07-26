import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useProvideAuth } from "../../hooks/AuthProvider";
import "./navBar.css";

const NavBar = () => {
  const {
    state: { user, isAuthenticated },
    signOut,
  } = useProvideAuth();
  const location = useLocation();

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
            {isAuthenticated && `${user.name}'s Blog`}
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
              onClick={signOut}
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
