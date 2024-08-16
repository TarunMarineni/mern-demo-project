const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const { updateUserValidation } = require("../validation/user-validation");
const validationMiddleware = require("../middleware/validate-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router
  .route("/users/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    validationMiddleware(updateUserValidation),
    adminController.updateUserById
  );

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

module.exports = router;
