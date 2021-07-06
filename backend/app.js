//Variables
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

//constante app en lui passant la fonction express(), permet de créer une application express
const app = express();
//Constantes d'import de routes
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauces");
//middelware helmet packages
app.use(helmet());
//middelware CORS
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
//Connection à la base de données
mongoose
  .connect(
    `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@sopekocko.qlesq.mongodb.net/${process.env.DB_NAME}:?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// middelware Bodyparser permet de prendre en charge les requêtes en json
app.use(express.json());
//middelware qui empêche les injections dans la base de donnée
app.use(mongoSanitize());
//middelware qui indique à Express qu'il faut gérer la ressource "images" de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));
//middelwares qui gerent les requetes envoyer aux routes de (sauceRoutes et authRoutes)
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", authRoutes);
//exporter l'application app
module.exports = app;
