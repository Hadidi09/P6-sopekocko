//variables
const mongoose = require("mongoose");
// Utilisation de la fonction Schema() de mongoose pour la création d'un schéma document pour une sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisLiked: { type: [String] },
});
//exportation sauceSchema en  tant que modèle mongoose
module.exports = mongoose.model("Sauce", sauceSchema);
