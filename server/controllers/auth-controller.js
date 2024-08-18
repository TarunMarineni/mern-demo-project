const bcrypt = require("bcryptjs");
const UserModel = require("../model/user-model");

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password, isAdmin } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return next({ status: 400, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
      username,
      email,
      phone,
      password: hashedPassword,
      isAdmin,
    });

    return res.status(201).json({
      message: "Registration successfully created",
      token: createdUser.generateToken(),
      userId: createdUser._id.toString(),
    });
  } catch (error) {
    return next({ status: 500, message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return next({ status: 400, message: "Invalid credentials" });
    }

    const validatePassword = await existUser.comparePassword(password);

    if (validatePassword) {
      return res.status(200).json({
        message: "Login successfully",
        token: existUser.generateToken(),
        userId: existUser._id.toString(),
      });
    } else {
      return next({ status: 400, message: "Invalid email or password" });
    }
  } catch (error) {
    return next({ status: 500, message: "Internal server error" });
  }
};

const user = (req, res, next) => {
  try {
    const userData = req.user;

    res.status(200).json({
      userData,
    });
  } catch (error) {
    return next({ status: 500, message: "Internal server error" });
  }
};

module.exports = { register, login, user };
