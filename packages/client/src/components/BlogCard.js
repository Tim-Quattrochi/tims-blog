import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ProductCard({ blog }) {
  console.log(blog);
  return (
    <Container className="mb-3" style={{ height: '300px' }}>
      <Card
        bg="light"
        text="dark"
        style={{ position: 'relative', height: '100%' }}
      >
        {/* <Card.Img
          height={150}
          src={blog.img}
          style={{ objectFit: 'cover' }}
        /> */}
        <Card.Body>
          <Card.Title as="h6" style={{ color: 'info' }}>
            <Row>
              <Col>
                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
              </Col>
              <Col className="text-right font-weight-bold"></Col>
            </Row>
          </Card.Title>
          <Card.Text style={{ fontSize: '.8rem' }}>
            {blog.title}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
