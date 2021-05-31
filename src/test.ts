import createError, { HttpError } from "http-errors";
import express, { request, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import cors from "cors";
import connectDB from "./database/mongoConnect";
import passport from "passport";
import { dbConnect } from "./database/mongoMemoryConnect";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

// import
import { googleStrategy } from "./controllers/passport";

dotenv.config();

const app = express();

// app.use(express.static(path.join(__dirname, '../', 'public')));
// view engine setup

// googleStrategy(passport);

// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// passport middleware
app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'akfc76q3gbd83bqdh' }));

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/v1/music-box-api/auth/google/success",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      console.log(profile);

      return done(null, profile);
    }
  )
);

if (process.env.NODE_ENV === "test") {
  dbConnect();
} else {
  connectDB();
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/v1/music-box-api/auth/google/success",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

app.get("/profile", (req, res) => {
  res.send("Authenticated");
});

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id: any, done) {
  return done(null, id);
});

app.listen(3002, () => {
  console.log("running");
});
