const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controller");
const {
  userSignInValidation,
  userSignUpValidation,
} = require("../validation/user-validation");
const validationMiddleware = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

router
  .route("/register")
  .post(validationMiddleware(userSignUpValidation), auth.register);

router
  .route("/login")
  .post(validationMiddleware(userSignInValidation), auth.login);

router.route("/user").get(authMiddleware, auth.user);

module.exports = router;
