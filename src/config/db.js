const mongoose = require("mongoose");
const config = require("./index");

const connect = async () => {
  try {
    await mongoose.connect(config.databaseURL);
    console.log("Database connected successfully");
    return true;
  } catch (err) {
    console.log("Database connection failed", err);
    return false;
  }
};

module.exports = connect