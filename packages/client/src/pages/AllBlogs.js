import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import api from '../utils/api';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AllBlogs = () => {
  const [blog, setBlog] = useState();

  useEffect(() => {
    api
      .get(`/blogs`)
      .then((response) => setBlog(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {blog ? (
        <Container>
          {blog.map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))}
          {/* <p>{blog.description}</p>
          {blog && blog.isCreator && <BlogPostForm />} */}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AllBlogs;
