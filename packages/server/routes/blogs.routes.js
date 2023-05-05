import { Router } from "express";
import {
  createBlog,
  createBlogPost,
  deleteBlogPost,
  getAllBlogs,
  getBlogById,
  editBlogPost,
} from "../controllers/blog.controller";
import { requireAuth } from "../middleware";

const blogsRouter = Router();

blogsRouter.route("/").get(getAllBlogs);

blogsRouter
  .route("/:id")
  .get(requireAuth, getBlogById)
  .post(requireAuth, createBlogPost)
  .delete(requireAuth, deleteBlogPost)
  .put(requireAuth, editBlogPost);

blogsRouter.route("/create/:id").post(requireAuth, createBlog); //using this one to create a blog

export default blogsRouter;
