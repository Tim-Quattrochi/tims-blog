import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CreateBlogPage from '../pages/CreateBlogPage';
import api from '../utils/api';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import BlogPostForm from '../components/BlogPostForm';

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();

  useEffect(() => {
    api
      .get(`/blogs/${blogId}`)
      .then((response) => setBlog(response))
      .catch((err) => console.log(err));
  }, [blogId]);

  //   const date = parseISO(blog.createdAt);

  return (
    <>
      {blog ? (
        <Container>
          <BlogCard blog={blog.blog} />

          {/* {blog && blog.isCreator && <CreateBlogPage />} */}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default BlogPage;
