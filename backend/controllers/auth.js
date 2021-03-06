//Variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const maskData = require('maskdata')
const passwordValidator = require('password-validator');

// schema de validation du mot de passe
const schema = new passwordValidator();
// Ajout des propiètés du schema
schema
.is().min(8)                                    
.is().max(24)                                  
.has().uppercase(1)                             
.has().lowercase(1)                              
.has().digits(2)                           
.has().not().spaces()         

// regex email
let regEmail = new RegExp('^[a-z0-9_-]+@[a-z]+.[a-z]{2,3}$')

// variables maskdata
const emailMask2Options = {
  maskWith: "*", 
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

//controllers pour la route signup
exports.signup = (req, res, next) =>
{
  if (!schema.validate(req.body.password)) {

    res.json({status:400,
      message: "Mot de passe non sécurisé, doit contenir au moins 8 caractères, 2 numéros, une MAJ, une MINUS, et pas d'espace !" });
    return false;
  }
  if (!req.body.email == regEmail)
  {
    res.json({ status: 400, message: "Entrez un email valide !! Utilisez des caractères(Minus/MAJ), des numéros(0 et 9) ou des (_), Min: 8 caractères/max : 20 caractères, suivi d'un (@) de lettres (minuscules), d'un (.) enfin de lettres (minuscules)  Min: 2/max : 3" })
    return false;
  }
    bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: maskData.maskEmail2(req.body.email, emailMask2Options),
        password: hash,
       
      });
      user
        .save()
        .then(() => res.json({ status: 201, message: "Utlisateur crée !" }))
        .catch((error) => res.json({ status: 400, error: error }));
    })
   
  
    .catch((error) =>res.json({ status: 500, error: error }))
  
    
};
//controllers pour la route login
exports.login = (req, res, next) => {
  User.findOne({ email: maskData.maskEmail2(req.body.email, emailMask2Options) })
    .then((user) => {
      if (!user) {
        return res.json({ status: 401, error: "Email non valide !!" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.json({ status: 401, error: "Mot de passe incorrect !" });
          }
          res.json({
            status: 200,
            userId: user._id,
            token: jwt.sign({ userId: user._id },
              "RANDOM_TOKEN_SECRET",
              {
              expiresIn: "24h"
            }),
          });
        })
        .catch((error) => res.json({ status: 500, error: error }));
    })
    .catch((error) => res.json({ status: 500, error: error }));
};