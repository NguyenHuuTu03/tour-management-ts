import { Sequelize, DataTypes, STRING, TEXT } from "sequelize";
import sequelize from "../config/database";

const Tour = sequelize.define(
  "Tour",
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
    code: {
      type: DataTypes.STRING(10),
    },
    images: {
      type: TEXT("long"),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    information: {
      type: TEXT("long"),
    },
    schedule: {
      type: TEXT("long"),
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    timeStart: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "tours",
    timestamps: true, // tự động quản lý createAt, updateAt
  },
);

export default Tour;
