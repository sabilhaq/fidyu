var express = require("express");
var router = express.Router();
var models = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async function (req, res, next) {
  console.log("1", req.body);
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (user.verify(req.body.password)) {
      delete user.password;
      req.session.user = user;
      // console.log("user:", user);
      // console.log("req.session.user:", req.session.user);
      // console.log("req.session.user.id:", req.session.user.id);
      return res.redirect("/videos");
    }
  } catch (err) {
    console.log("err:", err);
    return res.redirect("/login");
  }
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return res.send(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
