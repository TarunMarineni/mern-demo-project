const ContactModel = require("../model/contact-model");

const contactController = async (req, res, next) => {
  const { username, email, message } = req.body;

  try {
    const createContact = await ContactModel.create({
      username,
      email,
      message,
    });

    res.status(200).json({
      message: "Contact form is created",
    });
  } catch (error) {
    next({ status: 400, message: "Contact form is not created" });
  }
};

module.exports = contactController;
