const Comment = require("../models/Comment");

const commentData = [
  {
    comment: "Awesome post!",
    blog_id: 1,
    user_id: 1,
  },
  {
    comment: "I agree!",
    blog_id: 2,
    user_id: 1,
  },
  { 
    comment: "AI disagree!", 
    blog_id: 3, 
    user_id: 1 
  },
  {
    comment: "No thanks!",
    blog_id: 1,
    user_id: 2,
  },
  {
    comment: "YAAAAASSS!",
    blog_id: 2,
    user_id: 2,
  },
  {
    comment: "Periodt!",
    blog_id: 3,
    user_id: 2,
  },
  {
    comment: "No way!",
    blog_id: 1,
    user_id: 3,
  },
  {
    comment: "Oh no!",
    blog_id: 2,
    user_id: 3,
  },
  {
    comment: "Boo!",
    blog_id: 3,
    user_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
