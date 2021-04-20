//Variables
const multer = require("multer");
//constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
/**
 * Constante storage avec la fonction destination pour enregistrer les fichiers dans le dossier images.
 * La  fonction filename indique à multer d'utiliser le nom d'origine.
 * Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée ;
 *
 */
//
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
//exportation de multer
module.exports = multer({ storage: storage }).single("image");
