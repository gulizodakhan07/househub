// Iltimos terminalda npm run dev deb ishga tushiring
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import houseRoutes from "./Router/product.router.js";
import { appConfig } from "./config/app.config.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "project", "frontend", "views"));

app.use("/public", express.static(path.join(process.cwd(), "project", "frontend", "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1',houseRoutes);

app.get("/", (_, res) => {
  res.render("index");
});

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on http://localhost:${appConfig.port}`);
});
