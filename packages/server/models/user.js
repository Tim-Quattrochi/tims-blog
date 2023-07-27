import { mongoose, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      minLength: [5, "Email must be at least 5 characters long."],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required."],
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
