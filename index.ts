import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import clientRoutes from "./routes/client/index.router";
import moment from "moment";

const app: Express = express();
const port: string | number = process.env.PORT || 3002;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.moment = moment;

clientRoutes(app);

app.listen(port, () => {
  console.log(`Hãy truy cập trang: http://localhost:${port}/categories`);
});
