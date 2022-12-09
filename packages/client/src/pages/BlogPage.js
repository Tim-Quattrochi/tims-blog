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
import EditBlog from './EditBlog';

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();
  const { deleteBlog } = useCreateBlog();
  const [editBlog, setEditBlog] = useState();
  const [isCreator, setIsCreator] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    api
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setEditBlog(response.blog);
        setBlog(response);
        setIsCreator(response.isCreator);
      })

      .catch((err) => console.log(err));
  }, [blogId]);

  console.log(isCreator);

  const handleClick = () => {
    setIsEdit((current) => !current);
  };

  const handleEdit = () => {
    return <EditBlog />;
  };

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
              <Button onClick={handleClick}>Edit</Button>
              {isEdit && <EditBlog id={blogId} blog={blog.blog} />}
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
