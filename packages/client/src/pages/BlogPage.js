import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import api from '../utils/api';

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();

  useEffect(() => {});

  return (
    <>
      {blog ? (
        <Container>
          <h1>{blog.blog.title}</h1>
          <p>{blog.blog.description}</p>
          {blog && blog.isCreator && <BlogPostForm />}
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
