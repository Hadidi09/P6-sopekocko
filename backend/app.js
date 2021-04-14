require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();

const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauces");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

mongoose.connect(
  `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@sopekocko.qlesq.mongodb.net/${process.env.DB_NAME}:?retryWrites=true&w=majority`
    ,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log( "Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
