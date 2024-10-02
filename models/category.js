const Sequelize = require("sequelize");

class Category extends Sequelize.Model {
  static initiate(sequelize) {
    Category.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
          defaultValue: "기본",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Category",
        tableName: "categories",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Category.hasMany(db.Todo);
  }
}

module.exports = Category;
