const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // get all blogs and associated user name
    const blogData = await Blog.findAll({
      attributes: ["id", "title", "blog", "date"],
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
  } catch (error) {
    res.status(500).json(error);
  }
});

// get route to request blog by blog_id
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogId = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["comment", "date"],
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
    res.render("blogpage", {
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

router.get("/editblog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("editBlog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/newblog", withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.render("newBlog", {
    logged_in: req.session.logged_in});
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
