"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoConnect_1 = __importDefault(require("./database/mongoConnect"));
var passport_1 = __importDefault(require("passport"));
var mongoMemoryConnect_1 = require("./database/mongoMemoryConnect");
var passport_google_oauth20_1 = require("passport-google-oauth20");
dotenv_1.default.config();
var app = express_1.default();
// app.use(express.static(path.join(__dirname, '../', 'public')));
// view engine setup
// googleStrategy(passport);
// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// passport middleware
app.use(passport_1.default.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'akfc76q3gbd83bqdh' }));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/music-box-api/auth/google/success",
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
if (process.env.NODE_ENV === "test") {
    mongoMemoryConnect_1.dbConnect();
}
else {
    mongoConnect_1.default();
}
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
app.get("/api/v1/music-box-api/auth/google/success", passport_1.default.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
}));
app.get("/profile", function (req, res) {
    res.send("Authenticated");
});
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport_1.default.deserializeUser(function (id, done) {
    return done(null, id);
});
app.listen(3002, function () {
    console.log("running");
});
