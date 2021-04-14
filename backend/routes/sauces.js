const express = require("express");

const router = express.Router();

const sauceControllers = require("../controllers/sauces");
const auth = require("../controllers/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, sauceControllers.createSauce);
router.post("/:id/like", sauceControllers.createAddLikes);
router.put("/:id", multer, sauceControllers.modifySauce);
router.delete("/:id", sauceControllers.deleteSauce);
router.get("/", sauceControllers.getAllSauce);
router.get("/:id", sauceControllers.getOneSauce);

module.exports = router;
