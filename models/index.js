const User = require("./User");
const Blog = require("./Blog");

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Blog, {
  foreignKey: "user_id",
});

module.exports = {
User,
Blog
};