import { Router } from "express";
import {
  createBlog,
  createBlogComment,
  deleteBlogPost,
  getAllBlogs,
  getBlogById,
  editBlogPost,
  getBlogsByUser,
} from "../controllers/blog.controller";
import { requireAuth } from "../middleware";

const blogsRouter = Router();

blogsRouter.route("/my-blogs").get(requireAuth, getBlogsByUser);

blogsRouter.route("/").get(getAllBlogs);

blogsRouter
  .route("/:id")
  .get(requireAuth, getBlogById)
  .put(requireAuth, createBlogComment)
  .delete(requireAuth, deleteBlogPost)
  .put(requireAuth, editBlogPost);

blogsRouter.route("/create/:id").post(requireAuth, createBlog);

export default blogsRouter;
