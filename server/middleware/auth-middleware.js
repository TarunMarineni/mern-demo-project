const jwt = require("jsonwebtoken");
const UserModel = require("../model/user-model");

const authMiddleware = async (req, res, next) => {
  const token = await req.header("Authorization");

  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  tokenVal = token.replace("Bearer", "").trim();

  jwt.verify(tokenVal, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      return res.json({
        message: "Failed to authenticate token.",
      });
    }

    userData = await UserModel.findOne({ email: decoded.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(400).json({ message: "user not found" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  });
};

module.exports = authMiddleware;
