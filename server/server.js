import express from "express";
import formData from "express-form-data";
import process from "process";
import "express-async-errors";
import cookieParser from "cookie-parser";
import debug from "debug";
import logger from "morgan";
import chalk from "chalk";
import cors from "cors";
import os from "os";
import { config } from "dotenv";
import Routes from "./routes/v1";
import db from "./database/models";
import http from "http";

config();
const log = debug("dev");

const { PORT } = process.env;
const port = PORT || 4000;
const server = express();

try {
  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };

  server.use(formData.parse(options));
  server.use(formData.format());
  server.use(formData.stream());
  server.use(formData.union());
  server.use(express.urlencoded({ extended: true }));

  const whitelist = process.env.whiteList.split(",");
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Content-Type"
    ]
  };

  server.use(cors({}));
  server.use(logger("dev"));
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ extended: true }));

  server.get("/api/v1", (req, res) =>
    res.status(200).json({
      message: "Welcome to audio-series"
    })
  );

  // Routes(app);
  server.use("/api/v1", Routes);

  //server.get('*', (req, res) => handle(req, res));

  // Finally, check db connection then start the server...
  const { sequelize } = db;

  sequelize
    .authenticate()
    .then(() => {
      log("Sequelize connection was successful");
    })
    .catch(err => {
      log(chalk.yellow(err.message));
    });

  sequelize.sync();

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready =>`, port);
  });
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}
const app = http.createServer(server);
export default app;
