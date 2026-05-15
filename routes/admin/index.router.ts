import { Express } from "express";
import { categoryRoutes } from "./category.router";
import { systemConfig } from "../../config/system";
import { tourRoutes } from "./tour.router";
import { uploadRoutes } from "./upload.router";

const adminRoutes = (app: Express) => {
  const prefixAdmin = systemConfig.prefixAdmin;
  app.use(prefixAdmin + "/categories", categoryRoutes);
  app.use(prefixAdmin + "/tours", tourRoutes);
  app.use(prefixAdmin + "/uploads", uploadRoutes);
};

export default adminRoutes;
