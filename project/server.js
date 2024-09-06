// Iltimos terminalda npm run dev deb ishga tushiring
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { appConfig } from "./config/app.config.js";
import { config } from "dotenv";
import { MongoDB } from "./config/mongo.config.js";
import { routes } from "./router/index.routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "project", "frontend", "views"));
config()
app.use("/public", express.static(path.join(process.cwd(), "project", "frontend", "public")));
const PORT = process.env.APP_PORT || 1000
const HOST = process.env.APP_HOST

// app.use('/api/v1',houseRoutes);
MongoDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1',routes)
async function startApp(){
  try {
    app.listen(PORT,HOST, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(`Error on run server: ${error}`);
  }
} 
startApp()
// app.get("/", (_, res) => {
//   res.render("index");
// });



// #114 Setting new password for user