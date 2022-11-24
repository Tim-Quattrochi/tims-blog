import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateBlogPage from './pages/CreateBlogPage';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import BlogPage from './pages/BlogPage';
import AllBlogs from './pages/AllBlogs';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/create" element={<CreateBlogPage />} />
        <Route path="/blogs/:blogId" element={<BlogPage />} />
      </Routes>
    </Container>
  );
}

export default App;
