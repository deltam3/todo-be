const Sequelize = require("sequelize");

const Todo = require("./todo");
const User = require("./user");
const Category = require("./category");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};
const sequelize = new Sequelize(
  config.databse,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Todo = Todo;
db.User = User;
db.Category = Category;

Todo.initiate(sequelize);
User.initiate(sequelize);
Category.initiate(sequelize);

Todo.associate(db);
User.associate(db);
Category.associate(db);

module.exports = db;
