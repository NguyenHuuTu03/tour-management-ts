import { categoryRoutes } from "./category.router";
import { tourRoutes } from "./tour.router";
import { Express } from "express";

const clientRoutes = (app: Express) => {
  app.use("/tours", tourRoutes);
  app.use("/categories", categoryRoutes);
};

export default clientRoutes;
