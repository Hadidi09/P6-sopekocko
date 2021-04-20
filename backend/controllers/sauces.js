//Variables
const Sauce = require("../models/sauces");
const fs = require("fs");
// controllers route Post pour la création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.json({ status: 201, message: "Sauce enregistré" }))
    .catch((error) => res.json({ status: 400, error: error }));
};
// controllers route Post/id pour gérer les likes  et dislikes
exports.createAddLikes = (req, res, next) => {
  const like = req.body.like;

  console.log(like);
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const userId = req.body.userId;
      console.log(userId);

      switch (like) {
        case 1:
          Sauce.updateOne(
            { _id: req.params.id },
            { $addToSet: { usersLiked: userId }, $inc: { likes: +1 } }
          ).then(() => res.json({ status: 200, message: "Sauce Like" }));
          break;
        case -1:
          Sauce.updateOne(
            { _id: req.params.id },
            { $addToSet: { usersDisLiked: userId }, $inc: { dislikes: +1 } }
          ).then(() => res.json({ status: 200, message: "Sauce Dislike" }));
          break;
        case 0:
          if (sauce.likes) {
            Sauce.updateOne(
              { _id: req.params.id },

              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then((liked) => {
                if (!liked) {
                  throw new Error("send message error");
                }
                return res.json({ status: 200, liked });
              })
              .catch((error) => {
                console.log(error);
                return res.json({ status: 500, error: error });
              });
          }
          if (sauce.dislikes) {
            Sauce.updateOne(
              { _id: req.params.id },

              { $pull: { usersDisLiked: userId }, $inc: { dislikes: -1 } }
            )
              .then((disliked) => {
                if (!disliked) {
                  throw new Error("Send message error");
                }

                res.json({ status: 200, disliked });
                return;
              })
              .catch((error) => {
                if (error) {
                  return res.json({ status: 500, error: error });
                }
              });
          }

          break;

        default:
          console.log("NO LIKES Available");
      }
    })
    .catch((error) => res.json({ status: 400, error: error }));
};
// controllers route Put pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.json({ status: 200, message: "votre sauce a été modifié" }))
    .catch((error) => res.json({ status: 400, error: error }));
};
// controllers route delete pour la suppréssion d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).send({ message: "Objet supprimé !" }))
          .catch((error) => res.json({ status: 400, error: error }));
      });
    })

    .catch((error) => res.json({ status: 400, error: error }));
};
// controllers route Post pour la récupération de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).send(sauces);
    })
    .catch((error) => res.json({ status: 400, error: error }));
};
// controllers route Post pour la récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).send(sauce))
    .catch((error) => res.json({ status: 400, error: error }));
};
