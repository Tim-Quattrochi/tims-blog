import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [returningUser, setReturningUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOut = () => {
    localStorage.removeItem('blogUser');
    setIsLoggedIn(false);
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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        {returningUser ? `${returningUser}'s Blog` : 'Guest'}
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/blogs">
          All Blogs
        </Nav.Link>
        <Nav.Link as={Link} to="/blogs/create">
          Create Blog
        </Nav.Link>
        {isLoggedIn ? (
          <Nav.Link onClick={logOut} as={Link} to="/signin">
            Log Out
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/signin">
            Log In
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
