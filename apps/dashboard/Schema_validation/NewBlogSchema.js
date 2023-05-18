import * as YUP from "yup";

export const validateBlog = YUP.object().shape({
  title: YUP.string().required("Blog Title is required"),
  description: YUP.string().required("Blog Description is required"),
});
