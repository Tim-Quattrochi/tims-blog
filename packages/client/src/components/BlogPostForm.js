import React from 'react';
import { Button, Form } from 'react-bootstrap';
import useBlogPostForm from '../hooks/useBlogPostForm';

const BlogPostForm = () => {
  const {
    state,
    handleChange,
    handleSubmit,
    saveProgress,
    deleteDraft,
  } = useBlogPostForm();
  return (
    <Form onSubmit={handleSubmit}>
      <Button type="button" variant="info" onClick={saveProgress}>
        Save Draft
      </Button>
      <Button type="button" variant="danger" onClick={deleteDraft}>
        Delete Draft
      </Button>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Write your post</Form.Label>
        <Form.Control
          as="textarea"
          rows="10"
          name="content"
          value={state.content}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default BlogPostForm;
