const mongoose = require("mongoose");


const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devtown";
  console.log(MONGO_URI);

  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to DB successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
