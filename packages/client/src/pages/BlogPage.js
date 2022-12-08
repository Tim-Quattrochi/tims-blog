import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CreateBlogPage from '../pages/CreateBlogPage';
import api from '../utils/api';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import BlogPostForm from '../components/BlogPostForm';
import Posts from '../components/Posts';
import formatDate from '../utils/formatDate';
import useCreateBlog from '../hooks/useCreateBlog';

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();
  const { deleteBlog } = useCreateBlog();
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    api
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setBlog(response);
        setIsCreator(response.isCreator);
      })

      .catch((err) => console.log(err));
  }, [blogId]);

  console.log(isCreator);

  //   const date = parseISO(blog.createdAt);
  console.log(blog);

  return (
    <>
      {blog ? (
        <Container>
          <BlogCard blog={blog.blog}> </BlogCard>

          {isCreator ? (
            <div className="text-center">
              <Button
                onClick={(e) => {
                  deleteBlog(e, blogId);
                }}
              >
                Delete
              </Button>
            </div>
          ) : (
            ''
          )}

          {/* {blog && blog.isCreator && <CreateBlogPage />} */}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </> 
  );
};

export default BlogPage;
