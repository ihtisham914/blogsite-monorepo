import axios from "axios";
import { config } from "./config";
import { toast } from "react-hot-toast";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

export const CreateBlog = async (newBlog) => {
  try {
    const res = await API.post("/blogs", { ...newBlog }, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 401) {
        toast.error("You are not authorized to create blog", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      } else {
        toast.error("something went wrong!", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      }
    }
  }
};

// Edit blog
export const EditBlog = async (editBlog, id) => {
  try {
    const res = await API.patch(`/blogs/${id}`, { ...editBlog }, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 401) {
        toast.error("You are not authorized to Edit blog", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      } else {
        toast.error("something went wrong!", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      }
    }
  }
};

export const DeleteBlog = async (id) => {
  try {
    const res = await API.delete(`/blogs/${id}`, config);
    return res;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 401) {
        toast.error("You are not authorized to delete this blog", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      } else {
        toast.error("something went wrong!", {
          style: { width: "auto", height: "auto" },
        });
        return error.response.status;
      }
    }
  }
};

export default API;
