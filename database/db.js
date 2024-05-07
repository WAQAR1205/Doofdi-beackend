const mongoose = require("mongoose");

const databaseConnection = async () => {
  const MONGO_URL = `mongodb+srv://doofdi:GN09CdfSa0owLul6@doofdi.xg67ugw.mongodb.net/?retryWrites=true&w=majority&appName=doofdi`;
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Mongo DB Connected Successfully");
  } catch (error) {
    console.log("Error While Connected MongoDB", error);
  }
};

module.exports = databaseConnection;
