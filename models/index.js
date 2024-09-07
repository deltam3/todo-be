const Sequelize = require("sequelize");
const Todo = require("./todo");
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

Todo.initiate(sequelize);
Todo.associate(db);

module.exports = db;
