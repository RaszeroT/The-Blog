const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const { findAndCountAll } = require("../models/User");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // get all blogs and associated user name
    const blogData = await Blog.findAll({
      attributes: ["title", "blog"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
    // console.log(blogs);
    // res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get route to request blog by blog_id
// change from insomnia to render('blogPage)
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogId = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
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
    //   return simplified data
    const blog = blogId.get({ plain: true });
    console.log(blog);
    res.render("blogPage", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log(blogs);
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newblog", (req, res) => {
  if (req.session.logged_in) {
    res.render("newblog");
    return;
  }
  res.redirect("/login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
