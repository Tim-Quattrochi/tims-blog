import { useEffect, useReducer } from 'react';

const initialState = {
  title: '',
  content: '',
};

const reducer = (state, action) => {
  const { ...newState } = state;

  switch (action.type) {
    case 'LOAD_FROM_LOCAL':
      return action.payload;
    case 'HANDLE_CHANGE':
      newState[action.payload.name] = action.payload.value;
      //local storage to save every key event; optional
      //   localStorage.setItem(
      //     'blog_post_progress',
      //     JSON.stringify(newState)
      //   );
      return newState;
    case 'HANDLE_RESET':
      return initialState;
    default:
      return newState;
  }
};

const useBlogPostForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const saveProgress = () => {
    console.log('save');
    localStorage.setItem('blog_post_progress', JSON.stringify(state));
  };

  const deleteDraft = () => {
    localStorage.removeItem('blog_post_progress');
    dispatch({ type: 'HANDLE_RESET' });
  };

  return {
    state,
    handleChange,
    handleSubmit,
    saveProgress,
    deleteDraft,
  };
};

export default useBlogPostForm;
