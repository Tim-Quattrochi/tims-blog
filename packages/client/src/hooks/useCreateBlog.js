import { toast } from "react-toastify";
import { useProvideAuth } from "./AuthProvider";
const { useReducer, useEffect } = require("react");
const { useNavigate } = require("react-router-dom");

const { default: api } = require("../utils/api");

const initialState = {
  title: "",
  description: "",
  isSubmitting: false,
};

const reducer = (state, action) => {
  const { ...newState } = state;
  switch (action.type) {
    case "HANDLE_CHANGE":
      const { name, value } = action.payload;
      return { ...newState, [name]: value };
    case "HANDLE_RESET":
      return initialState;
    case "SET_IS_SUBMITTING":
      newState.isSubmitting = action.payload;
      return newState;
    case "LOAD_FROM_LOCAL":
      return action.payload;
    case "HANDLE_CHANGE_DRAFT":
      newState[action.payload.name] = action.payload.value;
      return newState;
    case "HANDLE_RESET_DRAFT":
      return initialState;
    default:
      return newState;
  }
};

const useCreateBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const auth = useProvideAuth();

  useEffect(() => {
    const savedBlogPost = JSON.parse(
      localStorage.getItem("blog_post_progress")
    );

    if (savedBlogPost) {
      dispatch({
        type: "LOAD_FROM_LOCAL",
        payload: savedBlogPost,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_CHANGE",
      payload: { name, value },
    });
  };
  const saveProgress = () => {
    localStorage.setItem("blog_post_progress", JSON.stringify(state));
  };

  const handleSetIsSubmitting = (value) => {
    dispatch({
      type: "SET_IS_SUBMITTING",
      payload: value,
    });
  };

  const handleSubmitBlog = (e) => {
    const userId = auth.state.user.uid;

    e.preventDefault();
    handleSetIsSubmitting(true);
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      handleSetIsSubmitting(false);
    }

    const { title, description } = state;

    api
      .post(`/blogs/create/${userId}`, { title, description })
      .then((response) => {
        reset();
        navigate(`/blog/${response._id}`);
      })
      .catch((err) => {
        toast.error(`${err.response?.data.error}`);
      });
  };

  const deleteBlog = (e, id) => {
    e.preventDefault();
    handleSetIsSubmitting(true);

    const { title, description } = state;

    api
      .delete(`/blogs/${id}`, { title, description })
      .then((response) => {
        toast.success("Blog post deleted successfully.");
        handleSetIsSubmitting(false);
        reset();
        navigate(`/blogs/`);
      })
      .catch((err) => {
        handleSetIsSubmitting(false);

        toast.error(err.response.data.error || err.message);
      });
  };

  const submitComment = (e, id) => {
    e.preventDefault();
    handleSetIsSubmitting(true);

    const { description } = state;

    api
      .put(`/blogs/${id}`, { description })
      .then((response) => {
        handleSetIsSubmitting(false);
        toast.success("Comment submitted successfully.");

        reset();
        navigate(`/blog/${id}`);
      })
      .catch((err) => {
        handleSetIsSubmitting(false);

        toast.error(err.response.data.error || err.message);
      });
  };

  const { title, description } = state;

  const editBlog = async (e, id) => {
    e.preventDefault();
    handleSetIsSubmitting(true);
    try {
      await api.put(`/blogs/${id}`, { title, description });
      toast.success("Blog edited Successfully.");
      reset();
      navigate(`/blog/${id}`);
    } catch (err) {
      handleSetIsSubmitting(false);
      toast.error(err.response.data.error || err.message);
    }
  };

  const reset = () => {
    localStorage.removeItem("blog_post_progress");

    dispatch({ type: "HANDLE_RESET" });
  };

  return {
    state,
    handleChange,
    handleSubmitBlog,
    submitComment,
    reset,
    saveProgress,
    deleteBlog,
    editBlog,
    dispatch,
  };
};

export default useCreateBlog;
