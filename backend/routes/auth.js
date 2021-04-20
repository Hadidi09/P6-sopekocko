//Variables
const express = require("express");
const router = express.Router();

//Constante pour exporter le fichier auth.js
const authControllers = require("../controllers/auth");
// Segment final des routes  /signup et /login
router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
//exportation du module router
module.exports = router;
