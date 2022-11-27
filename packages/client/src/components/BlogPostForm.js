import React from 'react';
import { Button, Form } from 'react-bootstrap';
import useCreateBlog from '../hooks/useCreateBlog';

const BlogPostForm = () => {
  const {
    state,
    handleSubmitBlog,
    handleChangeDraft,
    deleteDraft,

    saveProgress,
  } = useCreateBlog();

  return (
    <Form onSubmit={handleSubmitBlog}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={state.title}
          onChange={handleChangeDraft}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Write your post</Form.Label>
        <Form.Control
          as="textarea"
          rows="10"
          name="content"
          value={state.content}
          onChange={handleChangeDraft}
        />
      </Form.Group>
      <Button
        type="button"
        className="m-3"
        variant="success"
        onClick={handleSubmitBlog}
      >
        Post Blog
      </Button>
      <Button type="button" variant="info" onClick={saveProgress}>
        Save Draft
      </Button>
      <Button
        type="button"
        className="m-3"
        variant="danger"
        onClick={deleteDraft}
      >
        Delete Draft
      </Button>
    </Form>
  );
};

export default BlogPostForm;
