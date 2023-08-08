import React from "react";
import "./recentBlogs.css";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const RecentBlogs = ({ blogs, truncateText }) => {
  return (
    <section id="blog-846">
      <div className="cs-container">
        <div className="cs-content">
          <h2 className="cs-title">Latest Blogs</h2>
        </div>
        <ul className="cs-card-group">
          {blogs &&
            blogs.map((blog) => (
              <li key={blog._id} className="cs-item">
                {/* comment out because blogs don't have pictures yet. */}
                {/* <picture className="cs-picture">
                  <source
                    media="(max-width: 600px)"
                    srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FPeople%2Ftherapy2.jpg"
                  />

                  <source
                    media="(min-width: 601px)"
                    srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FPeople%2Ftherapy2.jpg"
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FPeople%2Ftherapy2.jpg"
                    alt={blog.title}
                    width="369"
                    height="290"
                  />
                </picture> */}
                <div className="cs-item-content">
                  <span className="cs-date">
                    {formatDate(blog.createdAt)}
                  </span>
                  <h3 className="cs-h3">{blog.title}</h3>
                  <p className="cs-item-text">
                    {truncateText(blog.description, 150)}
                  </p>
                  <Link to={`/blog/${blog._id}`} id="cs-link">
                    Read More
                    <img
                      className="cs-icon"
                      src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Forange-carrot-right.svg"
                      alt="arrow right"
                      width="20"
                      height="20"
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </li>
            ))}
        </ul>

        <Link to="/blogs" className="cs-button-solid">
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default RecentBlogs;
