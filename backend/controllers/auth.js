//Variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");

//controllers pour la route signup
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.json({ status: 201, message: "Utlisateur crée !" }))
        .catch((error) => res.json({ status: 400, error: error }));
    })
    .catch((error) => res.json({ status: 500, error: error }));
};
//controllers pour la route login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({ status: 401, error: "utilisateur non trouvé !" });
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
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.json({ status: 500, error: error }));
    })
    .catch((error) => res.json({ status: 500, error: error }));
};
