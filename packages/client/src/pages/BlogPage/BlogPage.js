import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import BlogCard from "../../components/BlogCard/BlogCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import useCreateBlog from "../../hooks/useCreateBlog";
import EditBlog from "../EditBlog";
import "./blogPage.css";

const BlogPage = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();
  const { deleteBlog } = useCreateBlog();
  const [isCreator, setIsCreator] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setBlog(response.blog);
        setIsCreator(response.isCreator);
      })

      .catch((err) => console.log(err));
  }, [blogId]);

  const handleClick = () => {
    setIsEdit((current) => !current);
  };

  return (
    <>
      {blog ? (
        <Container className="blog-page-container">
          <BlogCard blog={blog}> </BlogCard>

          {isCreator ? (
            <div className="text-center">
              <Button
                onClick={(e) => {
                  deleteBlog(e, blogId);
                }}
              >
                Delete
              </Button>
              <Button onClick={handleClick} className="edit">
                Edit
              </Button>
              <Button onClick={() => navigate(-1)} className="back">
                Go Back
              </Button>
              {isEdit && (
                <EditBlog
                  id={blogId}
                  blog={blog}
                  setIsEdit={setIsEdit}
                  setBlog={setBlog}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default BlogPage;
