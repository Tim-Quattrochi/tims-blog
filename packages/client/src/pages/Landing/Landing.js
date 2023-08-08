import React from "react";
import useGetBlogs from "../../hooks/useGetBlogs";
import RecentBlogs from "../../components/RecentBlogs.js/RecentBlogs";
import "./landing.css";
import Hero from "../../components/Hero/Hero";

const LandingPage = () => {
  const { blogs } = useGetBlogs();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + " ...";
  };

  

  return (
    <div>
      <Hero
        title="Welcome to Blog Talk"
        para="Explore our latest blog posts and stay informed."
        btnName="Explore Blogs"
        path="blogs"
      />

      <section
        className="recent-posts-section"
        style={{ backgroundColor: "#F5FFFA", color: "#0D1B2A" }}
      >
        <RecentBlogs blogs={blogs} truncateText={truncateText} />
      </section>
    </div>
  );
};

export default LandingPage;
