const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database Connected");
});

db.on("error", () => {
  console.log("Connection Failed");
});

module.exports = mongoose;
