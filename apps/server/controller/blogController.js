import { createError } from "../AppError.js";
import { BlogModel } from "../model/blogModel.js";

// Getting all products
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// Getting signle blog
export const getBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await BlogModel.findById(id);
  try {
    if (blog) {
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: blog,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Blog does not exist with the provided Id",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// create new blog
export const createBlog = async (req, res) => {
  try {
    const newBlog = await BlogModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// Updating single blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!blog) return next(createError(401, "Blog not found"));
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// delete blog controller
export const deleteBlog = async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// below are the controllers for client
// like controller
export const likeBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    const likes = blog.likes;

    const newBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { likes: likes + 1 },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        newBlog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// comment controller
export const commentBlog = async (req, res) => {
  const comment = req.body;
  try {
    const blog = await BlogModel.findById(req.params.id);

    await BlogModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { comments: comment },
    });

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
