// import { createError } from "../AppError.js";
// import { UserModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";

// admin sign in
export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    // console.log(process.env.ADMINNAME, process.env.PASSWORD);
    if (username == process.env.ADMINNAME && password == process.env.PASSWORD) {
      const token = jwt.sign(
        {
          name: process.env.ADMINNAME,
          password: process.env.PASSWORD,
        },
        process.env.JWT_KEY
      );
      res.status(200).json({
        status: "success",
        message: "logged In successfully",
        data: { username, token },
      });
    } else {
      res.status(401).json({
        status: "failed",
        message: "Incorrect username or password",
      });
      // next(createError(401, "incorrect Username or password"));
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error,
    });
    // next(createError(501, error));
  }
};

export const logOut = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Signed Out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
      message: error,
    });
  }
};
