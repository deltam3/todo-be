const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");

const app = express();
passportConfig();
dotenv.config();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

const corsOptions = {
  origin: "http://localhost:3002", // Your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Content-Type,Authorization,X-Requested-With,X-Auth-Token,Accept", // Add other headers as needed
  credentials: true,
};

app.use(cors(corsOptions));

app.set("port", process.env.PORT || 8001);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      // sameSite: "none",
      // maxAge: 3600000,
      // path: "/",
    },
    name: "sessionCookie",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/todos", pageRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.json({
    message: "error",
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
