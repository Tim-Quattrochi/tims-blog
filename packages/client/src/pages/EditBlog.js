import { useEffect, useState } from 'react';
import useCreateBlog from '../hooks/useCreateBlog';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditBlog = ({ id, blog }) => {
  const { state, handleChange, editBlog, reset, saveProgress } =
    useCreateBlog();
  const { title, description } = blog;
  const [edit, setEdit] = useState({
    title: title,
    description: description,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const updateBlog = api
      .put(`/blogs/${id}`, { title, description })
      .then((response) => {
        reset();
        navigate(`/blogs/${response._id}`);
      })
      .catch((err) => console.log(err));
  }, [id, reset, navigate, description, title]);

  console.log(blog);
  return (
    <Container>
      <h1>Edit your blog post</h1>
      <Form
        onSubmit={(e) => {
          editBlog(e, id);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={edit.title}
            onChange={(e) => setEdit(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            value={edit.description}
            onChange={(e) => setEdit(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            className="m-2"
            type="button"
            variant="secondary"
            onClick={saveProgress}
          >
            Save Draft
          </Button>
          <Button
            className="m-2"
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

export default EditBlog;
