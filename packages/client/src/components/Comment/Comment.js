import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardGroup, Container } from "react-bootstrap";
import formatDate from "../../utils/formatDate";

export default function Comment({ comment }) {
  //eventually link to comment authors profile.

  return (
    <Container>
      <CardGroup>
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>{comment.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Comment
            </Card.Subtitle>
            <Card.Text>{comment.commentText}</Card.Text>
            <Card.Text>
              Commented on {formatDate(comment.created)} by{" "}
              {comment.commentAuthor.name}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
}
