const ServiceModel = require("../model/service-model");

const serviceController = async (req, res) => {
  //   console.log("Hello");
  const response = await ServiceModel.find();

  if (!response) {
    res.status(400).json({ message: "Services not found" });
    return;
  }

  res.status(200).json({ response });
};

module.exports = serviceController;
