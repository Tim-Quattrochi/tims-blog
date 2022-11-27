const { useReducer, useEffect } = require('react');
const { useNavigate } = require('react-router-dom');
const { default: api } = require('../utils/api');

const initialState = {
  title: '',
  description: '',
  isSubmitting: false,
};

const reducer = (state, action) => {
  const { ...newState } = state;
  switch (action.type) {
    case 'HANDLE_CHANGE':
      newState[action.payload.name] = action.payload.value;
      return newState;
    case 'HANDLE_RESET':
      return initialState;
    case 'SET_IS_SUBMITTING':
      newState.isSubmitting = action.payload;
      return newState;
    case 'LOAD_FROM_LOCAL':
      return action.payload;
    case 'HANDLE_CHANGE_DRAFT':
      newState[action.payload.name] = action.payload.value;
      //local storage to save every key event; optional
      //   localStorage.setItem(
      //     'blog_post_progress',
      //     JSON.stringify(newState)
      //   );
      return newState;
    case 'HANDLE_RESET_DRAFT':
      return initialState;
    default:
      return newState;
  }
};

const useCreateBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBlogPost = JSON.parse(
      localStorage.getItem('blog_post_progress')
    );

    if (savedBlogPost) {
      dispatch({
        type: 'LOAD_FROM_LOCAL',
        payload: savedBlogPost,
      });
    }
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: e.target,
    });
  };
  const saveProgress = () => {
    console.log('save');
    localStorage.setItem('blog_post_progress', JSON.stringify(state));
  };

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_IS_SUBMITTING',
      payload: true,
    });
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      dispatch({
        type: 'SET_IS_SUBMITTING',
        payload: false,
      });
    }

    const { title, description } = state;

    api
      .post('/blogs', { title, description })
      .then((response) => {
        reset();
        navigate(`/blogs/${response._id}`);
      })
      .catch((err) => console.log(err));
  };

  const reset = () => {
    localStorage.removeItem('blog_post_progress');

    dispatch({ type: 'HANDLE_RESET' });
  };

  return {
    state,
    handleChange,
    handleSubmitBlog,
    reset,
    saveProgress,
  };
};

export default useCreateBlog;
