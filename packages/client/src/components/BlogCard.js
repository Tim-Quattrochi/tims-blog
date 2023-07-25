import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardGroup, Container } from "react-bootstrap";
import formatDate from "../utils/formatDate";
import Posts from "./Posts";
import uuid from "react-uuid";

export default function BlogCard({ blog }) {
  const location = useLocation();
  const dateStr = blog?.createdAt;

  const { blogId } = useParams();

  return (
    <Container>
      <CardGroup>
        <Card
          className="my-4"
          style={{ width: "auto", margin: "20px" }}
        >
          <Card.Body>
            <Card.Title as="h4" style={{ color: "#007bff" }}>
              {location.pathname === `/blogs/${blogId}` ? (
                `${blog.title}`
              ) : (
                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
              )}{" "}
            </Card.Title>

            <Card.Text
              as="p"
              className="text-justify"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {blog?.description}
            </Card.Text>
            <Card.Text className="text-muted">
              {" "}
              posted by {blog.author?.name}
              on {formatDate(dateStr)}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      {blogId
        ? blog.posts
          ? blog.posts.map((post) => (
              <Posts key={uuid()} blog={post} />
            ))
          : ""
        : ""}
    </Container>
  );
}
