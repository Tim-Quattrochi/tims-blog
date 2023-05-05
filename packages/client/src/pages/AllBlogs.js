import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";

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
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AllBlogs;
