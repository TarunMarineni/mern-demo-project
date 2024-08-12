const bcrypt = require("bcryptjs");
const UserModel = require("../model/user-model");

const home = async (req, res, next) => {
  try {
    return res.send("Home api");
  } catch (error) {
    // return res.status(400).json({ message: "Internal server error" });
    next({ status: 400, message: "Internal server error" });
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password, isAdmin } = req.body;

    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      // return res.status(400).json({
      //   message: "User already exist",
      // });
      next({ status: 400, message: "User already exist" });
    }

    const createdUser = await UserModel.create({
      username,
      email,
      phone,
      password,
      isAdmin,
    });

    return res.status(201).json({
      message: "Registration succesfully created",
      token: createdUser.generateToken(),
      userId: createdUser._id.toString(),
    });
  } catch (error) {
    // return res.status(400).json({ message: "Internal server error" });
    next({ status: 400, message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await UserModel.findOne({ email });

  if (!existUser) {
    // return res.status(401).json({ message: "Invalid credentials" });
    next({ status: 400, message: "Invalid credentials" });
  }

  const validatePassword = await existUser.comparePassword(password);

  if (validatePassword) {
    return res.status(201).json({
      message: "Login succesfully",
      token: existUser.generateToken(),
      userId: existUser._id.toString(),
    });
  } else {
    // return res.status(400).json({ message: "Invalid email or password" });
    next({ status: 400, message: "Invalid email or password" });
  }
};

const user = (req, res) => {
  try {
    const userData = req.user;

    res.status(200).json({
      userData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register, login, user };
