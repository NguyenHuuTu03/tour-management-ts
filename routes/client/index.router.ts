import { cartRoutes } from "./cart.router";
import { categoryRoutes } from "./category.router";
import { orderRoutes } from "./order.router";
import { tourRoutes } from "./tour.router";
import { Express } from "express";

const clientRoutes = (app: Express) => {
  app.use("/tours", tourRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/cart", cartRoutes);
  app.use("/order", orderRoutes);
};

export default clientRoutes;
