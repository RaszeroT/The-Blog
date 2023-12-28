const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // get all blogs and associated user name
    const blogData = await Blog.findAll({
      attributes: ["title", "blog"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // res.render(('homepage', {
    //     blogs,
    //     logged_in: req.session.logged_in
    // }
    // ))
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get route to request blog by blog_id
// change from insomnia to render('blogPage)
router.get("/blog/:id", async (req, res) => {
  try {
    const blogId = await Blog.findByPk(req.params.id, {
      attributes: ["title", "blog"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    //   return simplified data
    const blog = blogId.get({ plain: true });
    // res.render(('blogPage', {
    //     blog,
    //     logged_in: req.session.logged_in
    // }
    // ))
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;




// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

// TODO: ^^^ ability to click and comment 

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// TODO: ^^^ create render to blogpost for a click for /blog/:id... add ability to comment
// -----------------------------------------------

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

// TODO: ^^^ create post to create new blog with
// ------------------------------------------------

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

// TODO ^^^ delete route
// -------------------------------------------------

// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site

// TODO: ^^^ logout function
// --------------------------------------------------

// WHEN I am idle on the site for more than a set time
// THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

// TODO: ^^^ add session with time
// -------------------------------------------------

// WHEN I click on the homepage option
// THEN I am taken to the homepage
// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in
// WHEN I choose to sign up

// TODO: ^^^ created sign-up/sign-in views (preferably separate or a login page with a following link to a sign-up page)
// ---------------------------------------------

// THEN I am prompted to create a username and password
// WHEN I click on the sign-up button
// THEN my user credentials are saved and I am logged into the site

// TODO: ^^^ create post to create new user.
// ------------------------------------------------

// GIVEN a CMS-style blog site
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

// TODO: ^^^ Get route to render all blogs to homepage is ready... Figure out handlebars bug

// --------------------------------------------

// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password

// TODO: ^^^ email and password match. if same redirect to their dashboard.
// ------------------------------------------------


// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out
// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

// TODO: ^^^ use helper to add created date to blog and comments
// ------------------------------------------------