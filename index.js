const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/apiroutes");
const databaseConnection = require("./database/db.js");

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.v2.config({
  cloud_name: "Doofdi Backend",
  api_key: 625133414825635,
  api_secret: "ndtSNrfoBVt-4ZpeG2ICcck8lw0",
});

databaseConnection();

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
