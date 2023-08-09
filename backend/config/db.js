const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Mongo Db database`);
  } catch (error) {
    console.log(`Mongo Connect Error ${error}`);
  }
};

module.exports = connectDB;
