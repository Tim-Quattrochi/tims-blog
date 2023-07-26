import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useGetBlogs from "../../hooks/useGetBlogs";
import "./landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { blogs } = useGetBlogs();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + " ...";
  };

  const sortByNewest = (blog) => {
    return blog.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  return (
    <div>
      <section
        className="hero-section"
        style={{ backgroundColor: "#F0FFF4", color: "#0D1B2A" }}
      >
        <Container>
          <Row>
            <Col>
              <h1>Welcome to Blog Talk</h1>
              <p className="p-text">
                Explore our latest blog posts and stay informed.
              </p>
              {/* Add any other hero section content here */}
            </Col>
          </Row>
        </Container>
      </section>

      <section
        className="recent-posts-section"
        style={{ backgroundColor: "#F5FFFA", color: "#0D1B2A" }}
      >
        <Container>
          <h2 className="heading">Recent Blog Posts</h2>
          <Row>
            {blogs &&
              sortByNewest(blogs).map((blog) => (
                <Col key={blog.id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {blog.author.name}
                      </Card.Subtitle>
                      <Card.Text>
                        {truncateText(blog.description, 150)}
                      </Card.Text>
                      <Button
                        as={Link}
                        variant="primary"
                        to={`/blog/${blog._id}`}
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </section>

      {/* Add other sections of the landing page here */}
    </div>
  );
};

export default LandingPage;
