import BlogCard from "../components/BlogCard/BlogCard";
import useGetBlogs from "../hooks/useGetBlogs";
import LoadingSpinner from "../components/LoadingSpinner";

const AllBlogs = () => {
  const { blogs } = useGetBlogs();

  return (
    <>
      {blogs ? (
        <div>
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AllBlogs;
