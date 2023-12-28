const Comment = require("../models/Comment");

const commentData = [
  {
    id: 1,
    comment: "Awesome post!",
    blog_id: 1,
    user_id: 1,
  },
  {
    id: 2,
    comment: "I agree!",
    blog_id: 2,
    user_id: 1,
  },
  { id: 3, comment: "AI disagree!", blog_id: 3, user_id: 1 },
  {
    id: 4,
    comment: "No thanks!",
    blog_id: 1,
    user_id: 2,
  },
  {
    id: 5,
    comment: "YAAAAASSS!",
    blog_id: 2,
    user_id: 2,
  },
  {
    id: 6,
    comment: "Periodt!",
    blog_id: 3,
    user_id: 2,
  },
  {
    id: 7,
    comment: "No way!",
    blog_id: 1,
    user_id: 3,
  },
  {
    id: 8,
    comment: "Oh no!",
    blog_id: 2,
    user_id: 3,
  },
  {
    id: 9,
    comment: "Boo!",
    blog_id: 3,
    user_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
