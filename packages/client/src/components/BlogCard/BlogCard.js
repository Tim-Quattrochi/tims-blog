import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import "./blogCard.css";

export default function BlogCard({ blog }) {
  const location = useLocation();
  const dateStr = blog?.createdAt;

  const { blogId } = useParams();

  return (
    <section id="card-body-container">
      <div className="card-body">
        <div className="cs-item-content">
          <span className="blog-card-date">
            {formatDate(blog.createdAt)}
          </span>
          <h3 className="card-title">
            {location.pathname === `/blog/${blogId}` ? (
              `${blog.title}`
            ) : (
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            )}{" "}
          </h3>
          <p className="blog-card-text">{blog.description}</p>
        </div>
        <div className="blog-card-author">
          {" "}
          Blogged by {blog.author?.name + " "}
          on {formatDate(dateStr)}
        </div>
      </div>
    </section>
  );
}
