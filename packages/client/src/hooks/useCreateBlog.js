const { useReducer } = require('react');
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
    default:
      return newState;
  }
};

const useCreateBlog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: e.target,
    });
  };

  const handleSubmit = (e) => {
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

  const reset = () => dispatch({ type: 'HANDLE_RESET' });

  return {
    state,
    handleChange,
    handleSubmit,
    reset,
  };
};

export default useCreateBlog;
