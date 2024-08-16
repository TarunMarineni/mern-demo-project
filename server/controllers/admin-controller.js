const UserModel = require("../model/user-model");
const ContactModel = require("../model/contact-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, { password: 0 });

    if (!users || users.length == 0) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userData = await UserModel.findById(id, { password: 0 });

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isDeleted = await UserModel.deleteOne({ _id: id });

    if (!isDeleted.acknowledged) {
      return res.status(400).json({
        message: "User not deleted",
      });
    }

    return res.status(200).json({
      isDeleted: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, email, phone, isAdmin } = req.body;

    const updatedData = await UserModel.updateOne(
      { _id: id },
      { $set: { username, email, phone, isAdmin } }
    );

    if (!updatedData.acknowledged) {
      return res.status(400).json({
        message: "User not updated",
      });
    }

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();

    if (!contacts || contacts.length == 0) {
      return res.status(400).json({
        message: "No contacts found",
      });
    }

    return res.status(200).json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isDeleted = await ContactModel.deleteOne({ _id: id });

    if (!isDeleted) {
      return res.status(400).json({
        message: "Contact not deleted",
      });
    }

    return res.status(200).json({
      isDeleted: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  updateUserById,
  getUserById,
};
