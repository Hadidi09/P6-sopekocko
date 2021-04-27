//Variables
const mongoose = require("mongoose");
//const Joi = require("joi")
const uniqueValidator = require("mongoose-unique-validator");


// Utilisation de la fonction Schema() de mongoose pour la création d'un schéma contenant l'email et le password
const authSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true,"Entrez votre Email"],
    unique: true,
    validate: /^[a-z0-9_-]+@[a-z]+.[a-z]{2,3}$/
  },
  password: { type: String, required: true },
});

authSchema.plugin(uniqueValidator);

//exportation authSchema en  tant que modèle mongoose
module.exports = mongoose.model("User", authSchema);
