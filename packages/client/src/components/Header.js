import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Tim's Blog</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/blogs">
          All Blogs
        </Nav.Link>
        <Nav.Link as={Link} to="/blogs/create">
          Create Blog
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
