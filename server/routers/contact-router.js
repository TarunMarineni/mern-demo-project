const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact-controller");
const validationMiddleware = require("../middleware/validate-middleware");
const contactValidation = require("../validation/contact-validation");

router
  .route("/")
  .post(validationMiddleware(contactValidation), contactController);

module.exports = router;
