//variables
const mongoose = require("mongoose");
// Utilisation de la fonction Schema() de mongoose pour la création d'un schéma document pour une sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: [true, "Entrez le nom de la sauce"], validate: /^[a-zA-Z\s]{3,25}$/ },
  manufacturer: { type: String, required: [true, "Entrez le nom du fabricant"], validate: /^[a-zA-Z\s]{3,25}$/ },
  description: { type: String, required:[true,"Ajoutez une description"], validate: /^[a-zA-Z\s]{15,200}$/ },
  mainPepper: { type: String, required: [true,"Ajoutez le nom des poivres"], validate: /^[a-zA-Z\s]{4,35}$/ },
  imageUrl: { type: String, required: [true,"Ajoutez une image"], validate: /([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/ },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisLiked: { type: [String] },
});
//exportation sauceSchema en  tant que modèle mongoose
module.exports = mongoose.model("Sauce", sauceSchema);
