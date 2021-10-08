var express = require("express");
var router = express.Router();
var models = require("../models");
var path = require("path");
var helper = require("../helpers/util")
const { Sequelize } = require("sequelize")

const Op = Sequelize.Op;

router.get("/", async function (req, res, next) {
  let offset = 0
  let limit = 16
  let search = ""
  if (req.query.offset) {
    offset = req.query.offset != "undefined" ? Number(req.query.offset) : 0
  }
  if (req.query.limit) {
    limit = req.query.limit ? Number(req.query.limit) : 16
  }
  if (req.query.search) {
    search = req.query.search
  }
  let data = {}
  data.offset = offset

  try {
    const videos = await models.Video.findAll({
      include: [{ model: models.User }],
      order: [["id", "ASC"]],
      order: [["views", "DESC"], ['createdAt', 'DESC'], ["likes", "DESC"]],
      limit,
      offset,
      where: {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    });
    data.videos = videos
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/admin", helper.isLoggedIn, async function (req, res, next) {
  try {
    const videos = await models.Video.findAll({
      where: { UserId: req.session.user.id },
      include: [{ model: models.Comment }, { model: models.User }],
      order: [["views", "DESC"]],
    });
    res.json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async function (req, res, next) {

  try {
    for (const file in req.files) {
      const [fileName, extension] = req.files[file].name.split(".");
      const id = Date.now()

      switch (file) {
        case "filevideo":
          req.files[file].mv(path.join("..", `/app/public/uploads/videos/${fileName}-${id}.${extension}`));
          req.body.url = `/uploads/videos/${fileName}-${id}.${extension}`
          break;

        case "filethumbnail":
          req.files[file].mv(path.join(process.env.PWD, "..", `/app/public/uploads/thumbnails/${fileName}-${id}.${extension}`));
          req.body.thumbnail = `/uploads/thumbnails/${fileName}-${id}.${extension}`
          break;

        default:
          break;
      }
    }
    req.body.voters = []
    if (!req.session.user.id) {
      throw err
    }
    req.body.UserId = req.session.user.id
    const video = await models.Video.create(req.body);
    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let video = await models.Video.findOne({
      where: { id: req.params.id },
    });
    req.body.views = video.views + 1
    const updatedVideo = await models.Video.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });

    video = await models.Video.findOne({
      where: { id: req.params.id },
      include: [{ model: models.Comment, include: [{ model: models.User }] }, { model: models.User }],
      order: [
        [{ model: models.Comment }, 'createdAt', 'DESC']
      ],
    });

    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {

  if (req.body.voters) {
    req.body.voters = JSON.parse(req.body.voters) || []
  }

  try {
    const video = await models.Video.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });
    res.json(video[1]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", async function (req, res, next) {
  try {
    let video = await models.Video.findOne({
      where: { id: req.params.id },
    });

    video.likes++
    video.voters.push(req.session.user.id)

    req.body.likes = video.likes
    req.body.voters = video.voters

    const updatedVideo = await models.Video.update(req.body, {
      where: {
        id: video.id,
      },
      returning: true,
      plain: true,
    });

    res.json(updatedVideo[1]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/dislike", async function (req, res, next) {
  try {
    let video = await models.Video.findOne({
      where: { id: req.params.id },
    });

    if (!video.voters.includes(Number(req.session.user.id))) {
      video.voters.push(Number(req.session.user.id))
    }
    video.dislikes++
    req.body.dislikes = video.dislikes
    req.body.voters = video.voters

    const updatedVideo = await models.Video.update(req.body, {
      where: {
        id: video.id,
      },
      returning: true,
      plain: true,
    });

    res.json(updatedVideo[1]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const video = await models.Video.destroy({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
