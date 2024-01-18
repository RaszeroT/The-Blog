const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ["comment", "user_id", "id"],
      include: [
        {
          model: Blog,
          attributes: ["title", "blog"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const comment = commentData.map((comment) => comment.get({ plain: true }));
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
