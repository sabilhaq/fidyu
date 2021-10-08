var express = require("express");
var router = express.Router();
var models = require("../models");
var helper = require("../helpers/util");

router.get("/", async function (req, res, next) {
  const isLoggedIn = req.session.user ? true : false
  const userId = req.session.user ? req.session.user.id : null
  res.render("index",
    {
      title: "FidYu",
      isLoggedIn: req.session.user ? true : false,
      userId: req.session.user ? req.session.user.id : null,
      active: "home",
      queryString: req.query,
    }
  );
});

router.get("/results", async function (req, res, next) {
  console.log(req.url);
  console.log(req.query);
  res.render("results",
    {
      title: `${req.query.search} - FidYu`,
      isLoggedIn: req.session.user ? true : false,
      userId: req.session.user ? req.session.user.id : null,
      active: "",
      fullurlpath: req.url,
      queryString: req.query,
    }
  );
});

router.get("/login", async function (req, res, next) {
  try {
    res.render("login", { title: "FidYu Login" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/watch/:videoid", async function (req, res, next) {
  const videoid = req.params.videoid
  const isLoggedIn = req.session.user ? true : false
  const userId = req.session.user ? req.session.user.id : null
  try {
    res.render("watch", { title: "FidYu", isLoggedIn, userId, videoid });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/videos", helper.isLoggedIn, async function (req, res, next) {
  res.render("videos/list");
});

router.get("/videos/add", helper.isLoggedIn, async function (req, res, next) {
  res.render("videos/add");
});

module.exports = router;
