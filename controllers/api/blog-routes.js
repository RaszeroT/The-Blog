const router = require("express").Router();
const { Blog, User } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const blogData = Blog.findAll({
      include: {
        model: User,
        attributes: ["name"]
      }
    });
    console.log(blogData)
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
