const { createContext, useReducer } = require('react');

const initialState = {
  blogTitle: 'Blog Central',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_BLOG':
      return initialState;
    default:
      return state;
  }
};

const blogCentralContext = createContext();

export const BlogCentralProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <blogCentralContext.Provider value={{ state, dispatch }}>
      {children}
    </blogCentralContext.Provider>
  );
};
