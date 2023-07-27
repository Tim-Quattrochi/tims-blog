import React, { useEffect, useState } from "react";
import { Container, Button, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import BlogCard from "../../components/BlogCard/BlogCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import useCreateBlog from "../../hooks/useCreateBlog";
import EditBlog from "../EditBlog";
import Comment from "../../components/Comment/Comment";
import CreateComment from "../../components/CreateComment/CreateComment";
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

          {!isCreator && (
            <Col>
              <CreateComment blogId={blogId} />
            </Col>
          )}

          <Col as="span" className="back-btn-container">
            <Button onClick={() => navigate(-1)} className="back">
              Go Back
            </Button>
          </Col>

          {isCreator && (
            <>
              <div className="text-center btn-container">
                <Button
                  className="delete"
                  onClick={(e) => {
                    deleteBlog(e, blogId);
                  }}
                >
                  Delete
                </Button>
                <Button onClick={handleClick} className="edit">
                  Edit
                </Button>
              </div>
              <div>
                {isEdit && (
                  <EditBlog
                    id={blogId}
                    blog={blog}
                    setIsEdit={setIsEdit}
                    setBlog={setBlog}
                  />
                )}
              </div>
            </>
          )}
        </Container>
      ) : (
        <LoadingSpinner />
      )}

      {blog &&
        blog.blogComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </>
  );
};

export default BlogPage;
