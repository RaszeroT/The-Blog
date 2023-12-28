const router = require("express").Router();
const { User } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["id", "password"],
      },
    });
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("");

module.exports = router;
