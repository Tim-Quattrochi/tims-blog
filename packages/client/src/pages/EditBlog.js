import useCreateBlog from "../hooks/useCreateBlog";
import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

const EditBlog = ({ id, blog, setIsEdit, setBlog }) => {
  const {
    state,
    handleChange,
    editBlog,
    reset,
    saveProgress,
    dispatch,
  } = useCreateBlog();

  const { title, description } = state;

  useEffect(() => {
    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: "description",
        value: blog.description,
      },
    });
  }, [blog, dispatch]);

  return (
    <Container>
      <h1>Edit your blog post</h1>
      <Form
        onSubmit={(e) => {
          editBlog(e, id);
          setBlog({
            ...blog,
            title,
            description,
          });
          setIsEdit(false);
        }}
      >
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
            rows="3"
            name="description"
            value={state.description}
            onChange={handleChange}
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
