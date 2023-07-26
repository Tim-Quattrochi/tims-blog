import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useGetBlogs from "../../hooks/useGetBlogs";
import "./landing.css";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

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
      <Hero
        title="Welcome to Blog Talk"
        para="Explore our latest blog posts and stay informed."
        btnName="Explore Blogs"
        path="blogs"
      />

      <section
        className="recent-posts-section"
        style={{ backgroundColor: "#F5FFFA", color: "#0D1B2A" }}
      >
        <Container>
          <h2 className="heading">Recent Blog Posts</h2>
          <Row>
            {blogs &&
              sortByNewest(blogs).map((blog) => (
                <Col key={blog._id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {blog.author.name}
                      </Card.Subtitle>
                      <Card.Text>
                        {truncateText(blog.description, 150)}
                      </Card.Text>
                      <Button as={Link} to={`/blog/${blog._id}`}>
                        Read this blog
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
