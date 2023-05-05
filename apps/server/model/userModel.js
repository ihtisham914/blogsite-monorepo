import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const UserModel = Mongoose.model("User", userSchema);
