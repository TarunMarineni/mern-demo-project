const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controller");
const {
  userSignInValidation,
  userSignUpValidation,
} = require("../validation/user-validation");
const validationMiddleware = require("../middleware/validate-middleware");

router.route("/").get(auth.home);

router
  .route("/register")
  .post(validationMiddleware(userSignUpValidation), auth.register);

router
  .route("/login")
  .post(validationMiddleware(userSignInValidation), auth.login);

module.exports = router;
