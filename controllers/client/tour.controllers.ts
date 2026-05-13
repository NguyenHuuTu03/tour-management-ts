import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import Tour from "../../models/tour.model";
import { Request, Response } from "express";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  // const tours = await Tour.findAll({
  //   where: {
  //     deleted: false,
  //     status: "active",
  //   },
  //   raw: true,
  // });
  const tours = await sequelize.query(
    `
      SELECT tours.*,
      ROUND(
          tours.price * (1 - tours.discount / 100)
      ) AS newPrice
      FROM tours
      INNER JOIN tours_categories
      ON tours.id = tours_categories.tour_id
      INNER JOIN categories
      ON categories.id = tours_categories.category_id
      WHERE
          categories.slug = '${slugCategory}'
          AND tours.deleted = false
          AND tours.status = 'active'
          AND categories.deleted = false
          AND categories.status = 'active';
    `,
    {
      type: QueryTypes.SELECT,
    },
  );
  for (const tour of tours as any) {
    const images = JSON.parse(tour.images);
    tour.image = images[0];
    tour.newPrice = parseInt(tour.newPrice);
  }
  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tours",
    tours: tours,
  });
};

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;

  const tourDetail = await Tour.findOne({
    where: {
      slug: slugTour,
      deleted: false,
      status: "active",
    },
    raw: true,
  });
  (tourDetail as any).images = JSON.parse((tourDetail as any).images);
  (tourDetail as any).newPrice =
    (tourDetail as any).price * (1 - (tourDetail as any).discount / 100);
  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tour: tourDetail,
  });
};
