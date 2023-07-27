import { Blog, User } from "../models";

const populateQuery = [
  { path: "author", select: "name" },
  {
    path: "posts",
    select: ["Name"],
  },
];
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})

    .sort({ createdAt: "desc" })
    .populate(populateQuery);

  res.status(200).json(blogs);
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate(populateQuery);

  /* `const blogAuthorId = blog.author?._id.valueOf();` is getting the `_id` value of the author of a
 blog post and assigning it to the `blogAuthorId` variable. The `?` is the optional chaining
 operator, which checks if `blog.author` exists before trying to access its `_id` property. The
 `valueOf()` method is used to get the primitive value of the `_id` property, which is a MongoDB
 ObjectId. */
  const blogAuthorId = blog.author?._id.valueOf();

  res.json({
    isCreator: req.user.id.toString() === blogAuthorId.toString(),
    blog,
  });
};

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ error: "not authorized" });
    }
    console.log(description.length);
    if (description.length > 3000) {
      return res
        .status(422)
        .json({ error: "Max length of the description is 3,000" });
    }
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Please add a title and description" });
    }

    const newBlog = await Blog.create({
      title,
      description,
      author: req.user.id,
    });

    res.cookie("blogOwned", [newBlog._id], { httpOnly: true });

    res.json(newBlog);
  } catch (error) {
    console.log(error);
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

export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.author._id.toString() === req.user.id.toString()) {
      await blog.remove();
      return res.json({ success: "Blog successfully deleted." });
    } else {
      return res.status(401).json({
        error: "Not authorized to delete a non owned blog.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    return res
      .status(400)
      .json({ error: "Cannot submit empty blog edit." });
  }
  try {
    let blog = await Blog.findById(id);

    if (blog.author._id.toString() !== req.user.id.toString()) {
      return res.status(401).json({ error: "Not authorized." });
    }

    blog.title = title;
    blog.description = description;

    await blog.save();
    blog = blog.toJSON();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
