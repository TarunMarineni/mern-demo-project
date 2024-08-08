const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database is connected");
  } catch (error) {
    console.log("DB Connection failed");
    console.error(error);
  }
};

module.exports = connectDB;
