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
    blogComments: [
      {
        commentText: {
          type: String,
          required: true,
        },
        commentAuthor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Blog comment must have an author."],
        },
        created: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
