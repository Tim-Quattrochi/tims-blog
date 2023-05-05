import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useCreateBlog from "../hooks/useCreateBlog";
import EditBlog from "./EditBlog";

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
        <Container>
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
              <Button onClick={handleClick}>Edit</Button>
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
