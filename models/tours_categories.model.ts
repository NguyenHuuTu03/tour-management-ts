import { Sequelize, DataTypes, STRING, TEXT } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify";

const TourCategory = sequelize.define(
  "TourCategory",
  {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tours",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    tableName: "tours_categories",
    timestamps: false, // tự động quản lý createAt, updateAt
  },
);

export default TourCategory;
