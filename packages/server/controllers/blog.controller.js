import { Blog } from '../models';

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).select({});

  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  console.log(req.cookies.blogOwned === id);

  res.json({ isCreator: id === req.cookies.blogOwned, blog });
};

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newBlog = await Blog.create({ title, description });

    res.cookie('blogOwned', newBlog._id, { httpOnly: true });

    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, {
      $set: { posts: req.body },
    });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
