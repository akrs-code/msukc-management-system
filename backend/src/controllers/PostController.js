import Post from "../models/postModel.js";

// 📝 Create Post (Admin only)
export const createPost = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can create posts." });
    }

    const { title, content, category, visibility, author} = req.body;
    let emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!content) emptyFields.push("content");
    if (!category) emptyFields.push("category");
    if (!visibility) emptyFields.push("visibility");
    if (!author) emptyFields.push("author");
    if (!req.file) emptyFields.push("image");

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({
      title,
      content,
      category,
      visibility,
      author,
      image: imagePath,
      createdBy: req.user.id,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const userId = req.user ? req.user._id.toString() : null;

    const postsWithFlags = posts.map((post) => {
      const isLiked = userId
        ? post.likedBy.some((id) => id.toString() === userId)
        : false;
      const isViewed = userId
        ? post.viewedBy.some((id) => id.toString() === userId)
        : false;

      return {
        ...post.toObject(),
        hasLiked: isLiked,
        hasViewed: isViewed,
      };
    });

    res.status(200).json(postsWithFlags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Like / Unlike toggle
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likedBy.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      // Unlike
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();
    return res.json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes,
      hasLiked: !alreadyLiked,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Only allow one view per user
export const viewPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.viewedBy.includes(userId)) {
      return res.status(400).json({ message: "View already counted" });
    }

    post.views += 1;
    post.viewedBy.push(userId);
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
