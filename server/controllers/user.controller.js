const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const CV = mongoose.model('cv');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.status = req.body.status;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            if (err.code == 11000) {
                res.status(422).send(['Duplicate email address found.']);
            } else {
                return next(err);
            }
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    //On appelle la méthode d'authentification configurée dans passportConfig.js
    passport.authenticate('local', (err, user, info) => {
        //Si il y a une erreur on la retourne
        if (err) return res.status(400).json(err);
        //Si user est retourné (seulement si ça réussi), on crée un JsonWebToken grâce à la méthode définie dans user.model.js
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //Si l'email n'existe pas ou si le mot de passe est incorrect on affiche le message défini dans passportConfig.js
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'User record not found'});
            } else {
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email', 'status']) });
            }
        }
    );
}