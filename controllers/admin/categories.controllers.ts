import { Request, Response } from "express";
import Category from "../../models/category.model";

export const index = async (req: Request, res: Response) => {
  const records = await Category.findAll({
    where: {
      deleted: false,
    },
    raw: true,
  });
  res.render("admin/pages/categories/index", {
    pageTitle: "Quản lý danh mục",
    records: records,
  });
};
