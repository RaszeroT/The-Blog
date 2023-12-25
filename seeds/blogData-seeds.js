const Blog = require('../models/Blog')

const blogData = [
    {
        id: 1,
        title: 'my first blog post',
        blog: 'this blog is awesome',
        user_id: 1,
    },
    {
        id: 2,
        title: 'my second blog post',
        blog: 'this is my second awesome blog',
        user_id: 1,
    },
    {
        id: 3,
        title: 'guy 2, this is my first blog',
        blog: "this blog is also awesome",
        user_id: 2,
    },
    {
        id: 4,
        title: 'guy 2, this is my second blog',
        blog: "this is my second awesome blog",
        user_id: 2,
    },
    {
        id: 5,
        title: 'guy 3, this is my first blog',
        blog: 'this blog rules ',
        user_id:3,
    },
    {
        id: 6,
        title: 'guy 3, this is my second blog post',
        blog: 'this blog is fire',
        user_id: 3,
    }
]

const seedBlogs = () => Blog.bulkCreate(blogData)

module.exports = seedBlogs
