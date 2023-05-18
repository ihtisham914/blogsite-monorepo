import axios from "axios";
import { SignInStart, SignInSuccess, SignInError } from "../UserSlice";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const SignIn = async (data, dispatch) => {
  const { username, password } = data;
  dispatch(SignInStart());

  try {
    const res = await API.post(
      "api/v1/admin/login",
      { username, password },
      { withCredentials: true }
    );

    dispatch(SignInSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    if (err.response) {
      if (err.response.status == 401) {
        dispatch(SignInError("Wrong Credentials"));
      } else {
        dispatch(SignInError("Server error, please try again later"));
      }
    }
  }
};
