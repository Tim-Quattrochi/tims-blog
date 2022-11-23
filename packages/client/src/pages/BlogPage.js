import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import api from '../utils/api';

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();

  useEffect(() => {
    api
      .get(`/blogs/${blogId}`)
      .then((response) => setBlog(response))
      .catch((err) => console.log(err));
  }, [blogId]);

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

export default BlogPage;
