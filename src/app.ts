import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import cors from "cors";
import connectDB from "./database/mongoConnect";
import passport from "passport";
import { dbConnect } from "./database/mongoMemoryConnect";
import { facebookStrategy, googleStrategy } from "./controllers/passport";
import session from "express-session";

dotenv.config();

//= ======== DB Connect ===========
if (process.env.NODE_ENV === "test") {
  dbConnect();
} else {
  connectDB();
}

//= ========= Express Config ===============
const app = express();

// Static-Asset Rendering
app.use(express.static(path.join(__dirname, "../", "public")));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//= = Root Route ==============
app.use("/api/v1/music-box-api", indexRouter);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "akfc76q3gbd83bqdh",
    resave: false,
    saveUninitialized: true,
  })
);

// middleware for social login
googleStrategy(passport);
facebookStrategy(passport);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
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

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api/v1/music-box-api");
});

export default app;
