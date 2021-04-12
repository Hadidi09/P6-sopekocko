const Sauce = require('../models/sauces')

exports.createSauce = (req, res, next) =>
{
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré' }))
        .catch(error => res.status(400).json({ error }))
}

exports.createAddLikes = (req, res, next) =>
{
    
    const like = req.body.like
    
    
    console.log(like);
    Sauce.findOne({ _id: req.params.id })
        .then(sauce =>
        {
            const userId = req.body.userId
            console.log(userId);

            if (like == 1)
            {
                Sauce.updateOne({ _id: req.params.id },
                    { $push: { usersLiked: userId }, $inc: { likes: 1 } })
                        .then(() => res.status(200).json("sauce aimée"))
                        .catch(error => res.status(400).json({ error }))
            }
            else if (like == -1)
            {
                Sauce.updateOne({ _id: req.params.id },
                    { $push: { usersDisLiked: userId }, $inc: { dislikes: 1 } })
                        .then(() => res.status(200).json("sauce non aimée"))
                        .catch(error => res.status(400).json({ error }))
            }
            else if (like == 0)
            {
                Sauce.updateOne({ _id: req.params.id },
                    { $pull: { userIdLiked: userId } | { usersDisLiked: userId }, $inc: { likes: -1 } | { dislikes: -1 } })
                    .then(() => res.status(200).json("sauce égale zéro"))
                    .catch(error => res.status(400).json({ error }))
            }
            
             }
           )
}

exports.modifySauce = (req, res, next) =>
{
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }), {...sauceObject, _id: req.params.id }
        .then(() => res.status(200).json({ message: "votre sauce a été modifié" }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) =>
{
    
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Votre sauce a été supprimé" }))
        .catch(error => res.status(400).json({ error }))
}

exports.getAllSauce = (req, res, next) =>
{
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneSauce = (req, res, next) =>
{
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}

