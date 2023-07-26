import { useState, useEffect } from "react";
import api from "../utils/api";

const useGetBlogs = () => {
  const [blogs, setBlogs] = useState("");

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => {
        setBlogs(res);
      })
      .catch(console.log);
  }, []);

  return { blogs };
};

export default useGetBlogs;
