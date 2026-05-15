import { Router } from "express";
import * as controller from "../../controllers/admin/categories.controllers";

const router: Router = Router();

router.get("/", controller.index);

export const categoryRoutes = router;
