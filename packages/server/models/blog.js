import mongoose, { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      minLength: 15,
      maxLength: 1000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
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
          ref: 'User',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = model('Blog', blogSchema);

export default Blog;
