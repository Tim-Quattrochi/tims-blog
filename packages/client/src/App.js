import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateBlogPage from './pages/CreateBlogPage';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/Header';
import BlogPage from './pages/BlogPage';
import AllBlogs from './pages/AllBlogs';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Container>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/create" element={<CreateBlogPage />} />
        <Route path="/blogs/:blogId" element={<BlogPage />} />
      </Routes>
    </Container>
  );
}

export default App;
