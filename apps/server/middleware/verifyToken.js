import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../AppError.js";
dotenv.config();

export const verifyAdminToken = async (req, res, next) => {
  console.log(req.headers);

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);
  if (!token) {
    return next(createError(401, "Please Login first"));
  }

  jwt.verify(token, process.env.JWT_KEY, (error) => {
    if (error) {
      res.status(403).json({
        status: "failed",
        message: "Invalid Token",
      });
    }
  });
  next();
};
