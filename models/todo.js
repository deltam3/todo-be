const Sequelize = require("sequelize");

class Todo extends Sequelize.Model {
  static initiate(sequelize) {
    Todo.init(
      {
        todo: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        done: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        midelName: "Todo",
        tableName: "todos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = Todo;
