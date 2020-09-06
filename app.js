var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var morgan = require("morgan");
var helmet = require("helmet");
var passport = require("passport");
var session = require("express-session");
var exphbs = require("express-handlebars");
var models = require("./database/models");
var routes = require("./routes/routes")(passport);



require("dotenv").config();
require('./passport/passport')(passport, models.user);



var app = express();

const Sequelize = require("sequelize");
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  host: "db"
});

sequelize
  .authenticate()
  .then(() =>
    console.log("DAMN ! Connection has been established successfully.")
  )
  .catch(err =>
    console.error("SHIT ! Unable to connect to the database:", err)
  );

sequelize.sync({
  alter: true,
  preserveColumnsOnSync: true // PLEASE recommend a better name
});

/// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("short"));

app.use(helmet());

app.use("/api/v1/", routes);

// check the
// view engine setup

app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
