const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ["comment", "user_id"],
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

router.post("/", withAuth, async (req, res) => {
  try {    
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

module.exports = router;
