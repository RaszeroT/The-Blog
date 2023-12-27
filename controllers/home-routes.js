const router = require("express").Router();
const { User, Blog } = require("../models");
const withAuth = require("../utils/auth");

// change from insomnia view to .render('homepage')
router.get("/", async (req, res) => {
  try {
    // get all blogs and associated user name
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.status(200).json(blogs);
    // res.render(('homepage', {
    //     projects,
    //     logged_in: req.session.logged_in
    // }
    // ))
  } catch (error) {
    res.status(500).json(error);
  }
});

// get route to request blog by blog_id
// change from insomnia to render('blogPage)
router.get("/blog/:id", async (req, res) => {
    try {
        const blogId = await Blog.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: ["name"],
              },
            ],
          });
          //   return simplified data
          const blog = blogId.get({ plain: true });
          res.status(200).json(blog);
          // res.render(('homepage', {
          //     projects,
          //     logged_in: req.session.logged_in
          // }
          // ))
    } catch (error) {
        res.status(500).json(error)
    }

});

module.exports = router;
