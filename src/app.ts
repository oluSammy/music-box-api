import createError, { HttpError } from "http-errors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import cors from "cors";
import connectDB from "./database/mongoConnect";
import { dbConnect } from "./database/mongoMemoryConnect";

dotenv.config();

//= ======== DB Connect ===========
if (process.env.NODE_ENV === "test") {
  dbConnect();
} else {
  connectDB();
}
//= ==============================

//= ========= Express Config ===============
const app = express();

app.use(express.static(path.join(__dirname, "../", "public")));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route Register
app.use("/api/v1/music-box-api", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//= =======================================

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api/v1/music-box-api");
});

export default app;
