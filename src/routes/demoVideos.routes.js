const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const demoVideosSchema = require("../validations/demoVideos.validation");
const postDemoVideos = require("../controllers/demoVideos.controller");

const router = express.Router();
router.post("/", validate(demoVideosSchema), postDemoVideos);

module.exports = router;
