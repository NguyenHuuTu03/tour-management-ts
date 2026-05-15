import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "node:path";
import clientRoutes from "./routes/client/index.router";
import moment from "moment";
import adminRoutes from "./routes/admin/index.router";
import { systemConfig } from "./config/system";

const app: Express = express();
const port: string | number = process.env.PORT || 3002;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* New Route to the TinyMCE Node module */
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")),
);

app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`Hãy truy cập trang: http://localhost:${port}/categories`);
});
