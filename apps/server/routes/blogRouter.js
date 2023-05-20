import { Router } from "express";
import {
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  createBlog,
  likeBlog,
  commentBlog,
} from "../controller/blogController.js";
import { verifyAdminToken } from "../middleware/verifyToken.js";

const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs).post(createBlog);

//  routes for admin
blogRouter.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);

// routes for client
blogRouter.patch("/like/:id", likeBlog);
blogRouter.patch("/comment/:id", commentBlog);

export default blogRouter;
