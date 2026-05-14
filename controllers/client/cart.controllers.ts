import { Request, Response } from "express";
import Tour from "../../models/tour.model";

// [GET] /cart/
export const index = (req: Request, res: Response) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
  });
};

// [GET] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours = req.body;
  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });
    tour.info = infoTour;
    const images = JSON.parse((infoTour as any).images);
    tour.image = images[0];
    tour.priceNew =
      (infoTour as any).price * (1 - (infoTour as any).discount / 100);
    tour.total = tour.priceNew * tour.quantity;
  }
  res.json({
    tours: tours,
  });
};
