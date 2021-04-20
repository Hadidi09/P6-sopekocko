//Variables
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Utilisation de la fonction Schema() de mongoose pour la création d'un schéma contenant l'email et le password
const authSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^[a-z0-9_-]+@[a-z]+.[a-z]{2,3}$/,
  },
  password: { type: String, required: true, validate: /[a-zs]{3,25}/ },
});

//Utilisation de la fonction plugin() en lui passant en paramètre la constante uniquevalidator pour la verification
authSchema.plugin(uniqueValidator);

//exportation authSchema en  tant que modèle mongoose
module.exports = mongoose.model("User", authSchema);
