var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
var categoryRouter = require("./routes/category");
var salesRouter = require("./routes/sales");
const { ConnectToDatabase } = require("./models");
const validateToken = require("./middlewares/auth-middleware");
const roleAuthentication = require("./middlewares/role-auth-middleware");

var app = express();

ConnectToDatabase()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(validateToken);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/categories", categoryRouter);
app.use("/sale", salesRouter);
module.exports = app;