import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useCreateBlog from "../../hooks/useCreateBlog";
import "./createBlog.css";

const CreateBlogPage = () => {
  const {
    state,
    handleChange,
    handleSubmitBlog,
    reset,
    saveProgress,
  } = useCreateBlog();

  return (
    <Container className="CreateBlogContainer">
      <h1>Create a Blog</h1>
      <Form onSubmit={handleSubmitBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ whiteSpace: "pre-wrap" }}
            rows="3"
            name="description"
           
            value={state.description}
            onChange={handleChange}
          />
          <span className="charCount">
            Characters: {state.description.length}
          </span>
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            className="m-2 saveDraftBtn"
            type="button"
            variant="secondary"
            onClick={saveProgress}
          >
            Save Draft
          </Button>
          <Button
            className="m-2 resetBtn"
            type="button"
            variant="secondary"
            onClick={reset}
          >
            Reset
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CreateBlogPage;
