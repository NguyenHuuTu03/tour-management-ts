import { Sequelize, DataTypes, STRING, TEXT } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify";

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
      allowNull: true,
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

Tour.beforeCreate((tour: any) => {
  tour.slug = slugify(`${tour.title}-${Date.now()}`, {
    replacement: "-", // thay thế các khoảng trắng bằng "-"
    lower: true, // chuyển thành chữ thường, mặc định là false
    strict: true, // loại bỏ các ký tự đặc biệt, mặc định là false
    locale: "vi", // ngôn ngữ sử dụng
    trim: true, // loại bỏ các khoảng trắng ở đầu và cuối chuỗi
  });
});
export default Tour;
