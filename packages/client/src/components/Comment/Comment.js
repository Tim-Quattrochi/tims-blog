import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardGroup, Container } from "react-bootstrap";
import formatDate from "../../utils/formatDate";
import "./comment.css";

export default function Comment({ comment }) {
  //eventually link to comment authors profile.

  return (
    <Container className="comment-body-container">
      <Card className="comment-card">
        <Card.Body>
          <Card.Title className="comment-title">
            {comment.title}
          </Card.Title>

          <Card.Text className="comment-text">
            {comment.commentText}
          </Card.Text>
          <div className="comment-meta">
            <span className="comment-info">
              Commented on {formatDate(comment.created)} by{" "}
              {comment.commentAuthor.name}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
