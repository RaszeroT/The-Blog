const router = require("express").Router();
const { Blog, User, Comment } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    const blog = blogData.map((blog) => blog.get({ plain: true }));
    // console.log(blog);
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

module.exports = router;
