import axios from "axios";
import { GetBlogsStart, GetBlogsSuccess, GetBlogsError } from "../BlogSlice";
import { config } from "./config";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

export const GetBlogs = async (dispatch) => {
  dispatch(GetBlogsStart());

  try {
    const res = await API.get("/blogs");

    console.log(res.data.data);
    dispatch(GetBlogsSuccess(res.data.data));
    return res.data.data;
  } catch (err) {
    if (err.response) {
      if (err.response.status == 400) {
        dispatch(GetBlogsError("Couldn't get All blogs"));
        return err.response.status;
      } else {
        dispatch(GetBlogsError("Server error, please try again later"));
        return err.response.status;
      }
    }
  }
};
