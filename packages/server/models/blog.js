import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 75,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 3000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posts: [
      {
        title: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        content: {
          type: String,
          required: true,
          minLength: 20,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
