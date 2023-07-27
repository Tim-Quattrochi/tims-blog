import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateBlogPage from "./pages/CreateBlog/CreateBlogPage";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "./components/NavBar/NavBar";
import BlogPage from "./pages/BlogPage/BlogPage";
import AllBlogs from "./pages/AllBlogs";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/Landing/Landing";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="wrapper">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/blogs" element={<AllBlogs />} />

        {/* Beginning Private Routes */}
        <Route path="/blogs/create" element={<PrivateRoute />}>
          <Route path="/blogs/create" element={<CreateBlogPage />} />
        </Route>

        <Route path="/blog/:blogId" element={<PrivateRoute />}>
          <Route path="/blog/:blogId" element={<BlogPage />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* End Private Routes */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
