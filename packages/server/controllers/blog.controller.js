import { Blog, User } from '../models';

export const getAllBlogs = async (req, res) => {
  const populateQuery = [
    { path: 'author', select: 'name' },
    {
      path: 'posts',
      select: ['Name'],
    },
  ];
  const blogs = await Blog.find({})

    .sort({ createdAt: 'desc' })
    .populate(populateQuery);

  res.status(200).json(blogs);
};

export const getBlogById = async (req, res) => {
  const populateQuery = [
    { path: 'author', select: 'name' },
    { path: 'posts', select: ['name'] },
  ];
  const { id } = req.params;
  const blog = await Blog.findById(id).populate(populateQuery);

  res.json({ isCreator: id === req.cookies.blogOwned, blog });
};

export const createBlog = async (req, res) => {
  console.log('/createBlog');
  try {
    const { title, description } = req.body;
    console.log(req.user.id);
    const populateQuery = [
      { path: 'author', select: 'name' },
      {
        path: 'posts',
        select: ['Name'],
      },
    ];

    const user = await User.findById(req.user.id);
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: 'not authorized' });
    }
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: 'Please add a title and description' });
    }

    const newBlog = await Blog.create({
      title,
      description,
      author: req.user.id,
    });

    res.cookie('blogOwned', [newBlog._id], { httpOnly: true });

    res.json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createBlogPost = async (req, res) => {
  console.log('createBlogPost');
  console.log(req);
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

export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  console.log(req.user.id);

  try {
    console.log(req.user.id);
    const blog = await Blog.findById(id);

    console.log(blog.author._id.toString());
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.author._id.toString() === req.user.id.toString()) {
      await blog.remove();
      return res.json({ success: 'Blog successfully deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
