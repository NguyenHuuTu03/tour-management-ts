import { Router } from "express";
import * as controller from "../../controllers/admin/tour.controllers";
import multer from "multer";
const upload = multer();
import * as uploadMiddleware from "../../middleware/admin/uploadToCloudinary";

const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadMiddleware.uploadFields,
  controller.createPost,
);

export const tourRoutes = router;
