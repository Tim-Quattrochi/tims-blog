import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useCreateBlog from "../../hooks/useCreateBlog";
import "./createComment.css";

function CreateComment({ blogId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSubmit = (e, blogId) => {
    submitComment(e, blogId);

    if (!state.isSubmitting) {
      setShow(false);
    }
  };

  const { state, handleChange, submitComment, reset } =
    useCreateBlog();

  return (
    <>
      <Button onClick={handleShow}>Comment</Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="comment-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Comment on this blog</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={(e) => handleSubmit(e, blogId)}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleChange}
                value={state.description}
                className="textarea form-control"
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="btn-accent">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="accent"
            onClick={reset}
            className="btn-clear"
          >
            Clear
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateComment;
