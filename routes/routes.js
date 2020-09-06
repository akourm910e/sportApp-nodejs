var express = require("express");
var userCtrl = require("../controller/user");
var authCtrl = require("../controller/auth");

module.exports = (function(passport) {
  var api = express.Router();
  api.get("/", function(req, res) {
    res.json("WELCOME TO API V1 - Antoine Kourmanalieva");
  });

  api.route("/signUp").get(authCtrl.signUp);
  api.route("/signUp").post(
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signUp"
    })
  );
  api.route("/signIn").post(authCtrl.signIn);
  api.route("/dashboard").get(authCtrl.dashboard);
  

  api.route("/users").get(userCtrl.getAllUsers);
  api.route("/users/create").post(userCtrl.createUser);

  return api;
});
