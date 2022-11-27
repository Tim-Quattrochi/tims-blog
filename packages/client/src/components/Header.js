import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useProvideAuth } from '../hooks/AuthProvider';

const Header = () => {
  const [returningUser, setReturningUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useProvideAuth();
  console.log(auth);
  const {
    state: { isAuthenticated },
  } = useProvideAuth();

  const logOut = () => {
    setIsLoggedIn(false);
    auth.signOut();
  };

  useEffect(() => {
    //check local storage to see if returning user
    const localUser = JSON.parse(localStorage.getItem('blogUser'));

    if (localUser) {
      setIsLoggedIn(true);
      setReturningUser(localUser.name);
    }
  }, []);

  console.log(isLoggedIn);
  return (
    <Container>
      <Navbar expand="md" bg="primary" variant="dark">
        <Navbar.Brand>
          {isAuthenticated
            ? `${auth.state.user.name}'s Blog`
            : 'Guest'}
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/blogs">
            All Blogs
          </Nav.Link>
          {isAuthenticated ? (
            <Nav.Link as={Link} to="/blogs/create">
              Create Blog
            </Nav.Link>
          ) : (
            ''
          )}

          {isAuthenticated ? (
            <Nav.Link onClick={logOut} as={Link} href="/signin">
              Log Out
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/signin">
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
