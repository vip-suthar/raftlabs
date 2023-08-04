import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import {
  createBlogDataValidator,
  updateBlogDataValidator,
} from "../validators/blog.validator";

const blogRouter = express.Router();

blogRouter
  .route("/")
  .get(getAllBlogs)
  .post(createBlogDataValidator, createBlog);

blogRouter
  .route("/:id")
  .get(getBlogById)
  .put(updateBlogDataValidator, updateBlog)
  .delete(deleteBlog);

export default blogRouter;
