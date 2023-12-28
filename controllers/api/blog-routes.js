const router = require("express").Router();
const { Blog, User } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    const blog = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
