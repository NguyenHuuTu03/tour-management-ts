import { Sequelize, DataTypes, STRING, TEXT } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // tự động tăng,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
    },
    description: {
      type: TEXT("long"),
    },
    status: {
      type: DataTypes.STRING(20),
    },
    position: {
      type: DataTypes.INTEGER,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Đặt giá trị mặc định là false
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "categories",
    timestamps: true, // tự động quản lý createAt, updateAt
  },
);

export default Category;
