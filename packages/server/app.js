import "dotenv/config";
import colors from "colors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import keys from "./configs/keys";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";

mongoose
  .connect(keys.db.connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("[Database] Connection Established.".bgBlue)
  )
  .catch((err) =>
    console.log(
      "[Database] An error occurred connecting to the db: ".bgRed,
      err
    )
  );

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(keys.api.url, apiRouter);

if (process.env === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/build/index.html")
    );
  });
}

app.listen(keys.api.port, () =>
  console.log(`[Server] Listening on port ${keys.api.port}`.bgMagenta)
);
