import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    api
      .get(`/blogs`)
      .then((response) => setBlogs(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {blogs ? (
        <Container>
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AllBlogs;
