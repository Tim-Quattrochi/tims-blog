import { Router } from 'express';
import {
  createBlog,
  createBlogPost,
  deleteBlogPost,
  getAllBlogs,
  getBlogById,
} from '../controllers/blog.controller';
import { requireAuth } from '../middleware';

const blogsRouter = Router();

blogsRouter.route('/').get(getAllBlogs).post(requireAuth, createBlog);

blogsRouter
  .route('/:id')
  .get(getBlogById)
  .post(requireAuth, createBlogPost)
  .delete(requireAuth, deleteBlogPost);

export default blogsRouter;
