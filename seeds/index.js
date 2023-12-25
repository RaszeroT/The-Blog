const seedUsers = require("./userData-seeds");
const seedBlogs = require("./blogData-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n ----- USERS SEEDED -----N");

  await seedBlogs();
  console.log("\n ----- BLOGS SEEDED -----");
};

seedAll();
