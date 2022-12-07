import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardGroup, Container, Button } from 'react-bootstrap';
import formatDate from '../utils/formatDate';
import Posts from './Posts';
import uuid from 'react-uuid';
import useCreateBlog from '../hooks/useCreateBlog';

export default function ProductCard({ blog }) {
  console.log(blog);
  const { deleteBlog } = useCreateBlog();
  const dateStr = blog.createdAt;

  const { blogId } = useParams();

  return (
    <Container>
      <CardGroup>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title as="h6" style={{ color: 'info' }}>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>{' '}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>{blog.description}</Card.Text>
            <Card.Text>
              {' '}
              posted by {blog.author.name} on {formatDate(dateStr)}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      {blogId
        ? blog.posts
          ? blog.posts.map((post) => (
              <Posts key={uuid()} blog={post} />
            ))
          : ''
        : ''}
    </Container>
  );
}
