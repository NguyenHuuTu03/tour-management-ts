import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import * as generateHelper from "../../helpers/generate";
import TourCategory from "../../models/tours_categories.model";
import { systemConfig } from "../../config/system";

//[GET] /admin/tours
export const index = async (req: Request, res: Response) => {
  const records = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true,
  });
  for (const item of records as any) {
    const images = JSON.parse(item.images);
    item.image = images[0];
  }
  res.render("admin/pages/tours/index", {
    pageTitle: "Quản lý tour",
    records: records,
  });
};

//[GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active",
    },
    raw: true,
  });
  res.render("admin/pages/tours/create", {
    pageTitle: "Quản lý tour",
    categories: categories,
  });
};

//[POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
  const count = await Tour.count();
  const code = generateHelper.generateTourCode(count + 1);
  if (req.body.position === "") {
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const dataTour = {
    title: req.body.title,
    code: code,
    images: JSON.stringify(req.body.images),
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    information: req.body.information,
    schedule: JSON.stringify(req.body.schedule),
    timeStart: req.body.timeStart,
    stock: parseInt(req.body.stock),
    status: req.body.status,
    position: req.body.position,
  };
  const tour: any = await Tour.create(dataTour);
  const tourId = tour.id;

  const dataTourCategory = {
    tour_id: tourId,
    category_id: req.body.category_id,
  };
  await TourCategory.create(dataTourCategory);
  res.redirect(`${systemConfig.prefixAdmin}/tours`);
};
