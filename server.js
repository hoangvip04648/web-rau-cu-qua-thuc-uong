const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const indexRouter = require("./router/index.router");
const errorHandle = require("./middle-ware/error-handle");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
var fs = require("fs");
var upload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const categoryController = require("./controller/user/category");

// app.use("*", cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(upload());

//app.set('product_image',path.join(__dirname, '/public/product_image'));
app.set("layout", "admin/layout");
app.use(expressLayouts);

app.use(
  "/",
  (req, res, next) => {
    categoryController
      .getCategory()
      .then((data) => {
        app.locals.categorys = data;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  indexRouter
);

mongoose.connect("mongodb://localhost:27017/rau-cu-qua", (err) => {
  if (err) {
    console.log("can not connect to mongodb");
  } else {
    console.log("successful connected to mongodb");
  }
});

app.use(errorHandle);
app.listen("9000", () => {
  console.log("hello ");
});
