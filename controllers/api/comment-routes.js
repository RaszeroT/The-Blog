const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ["comment", 'user_id'],
      include: [
        {
          model: Blog,
          attributes: ["title", "blog"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const comment = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comment);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
