import * as Yup from "yup";

export const login_validate = Yup.object().shape({
  username: Yup.string().required("Username is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should contain at least 6 characters")
    .max(12, "Password should not exceed 12 characters"),
});
