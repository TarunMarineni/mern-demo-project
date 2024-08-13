require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/db");
const authRouter = require("./routers/auth-router");
const serviceRouter = require("./routers/service-router");
const contactRouter = require("./routers/contact-router");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/serivces", serviceRouter);

//Error middleware
app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server executes in port: ", PORT);
  });
});
