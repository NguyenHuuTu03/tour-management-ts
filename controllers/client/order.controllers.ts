import { Request, Response } from "express";
import Order from "../../models/order.model";
import * as generateHelpers from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

// [POST] /order/
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  const dataOrder = {
    code: "ORD000",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  };

  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;

  await Order.update(
    {
      code: generateHelpers.generateOrderCode(orderId),
    },
    {
      where: {
        id: orderId,
      },
    },
  );
  // lưu data vào bảng orderItem
  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: parseInt(item.tourId),
      quantity: item.quantity,
    };

    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });
    (dataItem as any).price = (infoTour as any).price;
    (dataItem as any).discount = (infoTour as any).discount;
    (dataItem as any).timeStart = (infoTour as any).timeStart;

    await OrderItem.create(dataItem);
  }

  res.json({
    code: 200,
    message: "Thành công!",
    orderCode: generateHelpers.generateOrderCode(orderId),
  });
};
// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  const order: any = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  });

  const orderItem: any = await OrderItem.findAll({
    where: {
      orderId: order.id,
    },
    raw: true,
  });

  for (const item of orderItem as any) {
    const infoTour: any = await Tour.findOne({
      where: {
        id: item.tourId,
      },
      raw: true,
    });
    item.image = JSON.parse(infoTour.images)[0];
    item.priceNew = item.price * (1 - item.discount / 100);
    item.total = item.priceNew * item.quantity;
    item.title = infoTour.title;
    item.slug = infoTour.slug;
  }
  order.totalPrice = orderItem.reduce(
    (sum: number, item: any) => sum + item.total,
    0,
  );
  res.render("client/pages/order/success", {
    pageTitle: "Đơn hàng của bạn",
    order: order,
    orderItem: orderItem,
  });
};
