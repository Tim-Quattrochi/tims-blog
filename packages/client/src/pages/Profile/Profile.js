import { useEffect, useState } from "react";
import api from "../../utils/api";
import BlogCard from "../../components/BlogCard/BlogCard";
import EditBlog from "../EditBlog";
import { Button } from "react-bootstrap";
import { useProvideAuth } from "../../hooks/AuthProvider";
import Masonry from "react-masonry-css";
import "./profile.css";

const Profile = () => {
  const [blogs, setBlogs] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);

  const {
    state: { user },
  } = useProvideAuth();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    api
      .get("/blogs/my-blogs")
      .then((res) => setBlogs(res))
      .catch(console.log);
  }, []);

  return (
    <div className="profile-page">
      <h1>{user.name}'s profile page</h1>
      <Masonry
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        breakpointCols={breakpointColumnsObj}
      >
        {blogs &&
          blogs.map((blog) => (
            <div key={blog._id}>
              <BlogCard blog={blog} />
              {editBlogId !== blog._id && (
                <Button
                  className="edit-button"
                  variant="primary"
                  onClick={() => setEditBlogId(blog._id)}
                >
                  Edit
                </Button>
              )}
              {editBlogId === blog._id && (
                <EditBlog
                  blog={blog}
                  setIsEdit={() => setEditBlogId(null)}
                />
              )}
            </div>
          ))}
      </Masonry>
    </div>
  );
};

export default Profile;
