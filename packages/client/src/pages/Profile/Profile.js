import { useEffect, useState } from "react";
import api from "../../utils/api";
import BlogCard from "../../components/BlogCard/BlogCard";
import EditBlog from "../EditBlog";
import { useProvideAuth } from "../../hooks/AuthProvider";
import "./profile.css";

const Profile = () => {
  const [blogs, setBlogs] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);

  const {
    state: { user },
  } = useProvideAuth();

  useEffect(() => {
    api
      .get("/blogs/my-blogs")
      .then((res) => setBlogs(res))
      .catch(console.log);
  }, []);

  return (
    <div className="profile-page">
      <h1>{user.name}'s profile page</h1>

      {blogs &&
        blogs.map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} />
            {editBlogId !== blog._id && (
              <div
                className="edit-button"
                onClick={() => setEditBlogId(blog._id)}
              >
                Edit
              </div>
            )}
            {editBlogId === blog._id && (
              <EditBlog
                blog={blog}
                setIsEdit={() => setEditBlogId(null)}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Profile;
