const express = require("express");

const router = express.Router();

//Variables
const sauceControllers = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Segment final des routes concernant les sauces
router.post("/", auth, multer, sauceControllers.createSauce);
router.post("/:id/like", auth, sauceControllers.createAddLikes);
router.put("/:id", auth, multer, sauceControllers.modifySauce);
router.delete("/:id", auth, sauceControllers.deleteSauce);
router.get("/", auth, sauceControllers.getAllSauce);
router.get("/:id", auth, sauceControllers.getOneSauce);
//exportation du module router
module.exports = router;
