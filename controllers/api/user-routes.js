const router = require("express").Router();
const { User } = require("../../models/");

// TODO: remove id and password from rendering to homepage
router.get("/", async (req, res) => {
  try {
    const userData = await User
      .findAll(
      //   {
      //   attributes: {
      //     exclude: ["id", "password"],
      //   },
      // }
      );
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const createUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = createUser.id;
      req.session.logged_in = true;

      res.status(200).json(createUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({ where: { email: req.body.email } });

    if (!loginUser) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await loginUser.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = loginUser.id;
      req.session.logged_in = true;

      res.json({ user: loginUser, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("");

module.exports = router;
