const express = require("express");

const router = express.Router();

//Variables
const sauceControllers = require("../controllers/sauces");
const auth = require("../controllers/auth");
const multer = require("../middleware/multer-config");

// Segment final des routes concernant les sauces
router.post("/", multer, sauceControllers.createSauce);
router.post("/:id/like", sauceControllers.createAddLikes);
router.put("/:id", multer, sauceControllers.modifySauce);
router.delete("/:id", sauceControllers.deleteSauce);
router.get("/", sauceControllers.getAllSauce);
router.get("/:id", sauceControllers.getOneSauce);
//exportation du module router
module.exports = router;
