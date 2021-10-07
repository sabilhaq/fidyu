var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll({ include: models.Video });
    res.json(users);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const user = await models.User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/check", async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    res.json(user.verify(req.body.password));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const user = await models.User.findOne({ where: { id: req.params.id } });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const user = await models.User.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });
    res.json(user[1]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
