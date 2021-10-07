var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async function (req, res, next) {
  try {
    const comments = await models.Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const comment = await models.Comment.create(req.body);
    res.json(comment);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const comment = await models.Comment.findOne({
      where: { id: req.params.id },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const comment = await models.Comment.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });
    res.json(comment[1]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const comment = await models.Comment.destroy({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
