const router = require("express").Router();
const { Blog, User, Comment } = require("../../models/");
const withAuth = require("../../utils/auth")

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    const blog = blogData.map((blog) => blog.get({ plain: true }));
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogIdData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    res.status(200).json(blogIdData);
    console.log("blogIdData", blogIdData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editPost = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(editPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.destroy({
      where: { blog_id: req.params.id },
    });

    const deleteBlog = Blog.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
