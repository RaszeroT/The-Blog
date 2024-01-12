const router = require("express").Router();
const { User } = require("../../models/");

// TODO: remove id and password from rendering to homepage
router.get("/", async (req, res) => {
  try {
    const userData = await User
      .findAll
      //   {
      //   attributes: {
      //     exclude: ["id", "password"],
      //   },
      // }
      ();
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    const userData = await newUser.save();

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({ where: { username: req.body.username } });

    if (!loginUser) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await loginUser.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
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

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({message: "You have successfully logged out"}).end();
    });
  } else {
    res.status(500).json({message: "There has been an issue"}).end();
  }
});

module.exports = router;
