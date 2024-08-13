const express = require("express");
const serviceController = require("../controllers/service-controller");
const router = express.Router();

router.route("/").get(serviceController);

module.exports = router;
