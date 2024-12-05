const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const contactUsSchema = require("../validations/contactUs.validation");
const postContactUs = require("../controllers/contactUs.controller");

const router = express.Router();
router.post("/", validate(contactUsSchema), postContactUs);

module.exports = router;
