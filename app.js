const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./passport/index");
const logger = require("./logger");
const helmet = require("helemet");
const hpp = require("hpp");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

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
  origin: "http://localhost:3002",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Content-Type,Authorization,X-Requested-With,X-Auth-Token,Accept",
  credentials: true,
};

app.use(cors(corsOptions));

app.set("port", process.env.PORT || 8001);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
}

app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/todos", pageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없다`);
  error.status = 404;
  logger.info("hello");
  logger.error(error.message);
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

module.exports = app;
