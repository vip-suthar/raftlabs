import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Blog from "../models/blog.model";
import { blogSerializer, blogsSerializer } from "../serializers/blog.serializer";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({}).populate("author", "-_id username email");
    res.json({ message: "success", data: blogsSerializer(blogs) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "-_id username email");
    res.json({ status: "success", data: blogSerializer(blog) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, tags } = req.body;

    const blog = new Blog({
      title: title,
      description: description,
      tags: tags,
      author: res.locals.user_id
    });

    await blog.save();

    await blog.populate("author", "-_id username email");

    res.json({
      status: "success",
      message: "blog created successfully.",
      data: blogSerializer(blog),
    });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);

    await blog?.populate("author", "-_id username email");
    res.json({
      status: "success",
      message: "blog updated successfully.",
      data: blogSerializer(blog),
    });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ status: "success", message: "blog deleted successfully." });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
