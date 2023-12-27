const router = require("express").Router();
const { User, Blog } = require("../models");

router.get('/', async (req, res) => {
    try {
        // get all blogs and associated user name 
        const blogData = await Blog.findAll(
            {
            include: [
                {
                model: User,
                attributes: ['name']
            }
        ]
        })

        // serialize data
        const blogs = blogData.map((blog) => blog.get({plain: true}))
        res.status(200).json(blogs)
        // res.render(('homepage', {
        //     projects,
        //     logged_in: req.session.logged_in
        // }
        // ))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
