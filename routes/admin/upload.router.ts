import { Router } from "express";
import * as controller from "../../controllers/admin/upload.controllers";
import * as uploadMiddleware from "../../middleware/admin/uploadToCloudinary";
import multer from "multer";
const upload = multer();

const router: Router = Router();
router.post(
  "/",
  upload.single("file"),
  uploadMiddleware.uploadSingle,
  controller.index,
);

export const uploadRoutes = router;
