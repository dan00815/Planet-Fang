const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override");
const planetRoutes = require("./routes/planet-routes");
const studentsRoutes = require("./routes/student-routes");
const cors = require("cors");

mongoose
  // .connect(process.env.MONGODB_CONNECTION)
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("成功連接到mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("成功");
});

//在middleware的下面
app.use("/planets", planetRoutes);
app.use("/students", studentsRoutes);

//套件末

app.use((err, req, res, next) => {
  console.log("抓到錯了");
  return res.render("error");
  // return res.status(404).render("error");
});

//伺服器
app.listen(3310, () => {
  console.log("伺服器已成功連接到port 3310");
});
