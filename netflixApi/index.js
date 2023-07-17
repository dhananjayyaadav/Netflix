const express = require("express");
const app = express();
const db = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movie");
const listRoutes = require("./routes/lists");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/list", listRoutes);

app.listen(8080, () => {
  console.log("Backend Server is running");
});
