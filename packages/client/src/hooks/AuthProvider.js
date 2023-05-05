// AuthProvider.js
import {
  useReducer,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  const signIn = async (email, password) => {
    try {
      const response = await api.post("auth/signin", {
        email: email,
        password: password,
      });
      localStorage.setItem("blogUser", JSON.stringify(response.user));
      localStorage.setItem(
        "blogUserToken",
        JSON.stringify(response.token)
      );

      console.log(response.user);
      dispatch({
        type: "LOGIN",
        payload: response.user,
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signUp = async (email, name, password, confirmPassword) => {
    try {
      await api.post("auth/signup", {
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      });
      return await signIn(email, password);
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/signin");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("blogUser"));
  };

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("blogUser")) || false;
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser,
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [dispatch]);

  return {
    state,
    getCurrentUser,
    signIn,
    signOut,
    signUp,
  };
}

export default AuthContext;
