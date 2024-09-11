const Sequelize = require("sequelize");

class Category extends Sequelize.Model {
  static initiate(sequelize) {
    Category.init(
      {
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Category.belongsTo(db.Todo);
  }
}

module.exports = Category;
