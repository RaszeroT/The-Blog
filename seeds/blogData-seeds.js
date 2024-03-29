const Blog = require("../models/Blog");

const blogData = [
  {
    title: "anna ,my first blog post",
    blog: "this blog is awesome",
    user_id: 1,
  },
  {
    title: "anna, my second blog post",
    blog: "this is my second awesome blog",
    user_id: 1,
  },
  {
    title: "timbir , this is my first blog",
    blog: "this blog is also awesome",
    user_id: 2,
  },
  {
    title: "timbir, this is my second blog",
    blog: "this is my second awesome blog",
    user_id: 2,
  },
  {
    title: "travis, this is my first blog",
    blog: "this blog rules ",
    user_id: 3,
  },
  {
    title: "travis, this is my second blog post",
    blog: "this blog is fire",
    user_id: 3,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
