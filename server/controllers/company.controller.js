const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Company = mongoose.model('Company');

module.exports.register = (req, res, next) => {
    var company = new Company();
    company.company_name = req.body.company_name;
    company.email = req.body.email;
    company.description = req.body.description;
    company.password = req.body.password;
    company.save((err, doc) => {
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
    passport.authenticate('local', (err, company, info) => {
        //Si il y a une erreur on la retourne
        if (err) return res.status(400).json(err);
        //Si user est retourné (seulement si ça réussi), on crée un JsonWebToken grâce à la méthode définie dans company.model.js
        else if (company) return res.status(200).json({ "token": company.generateJwt() });
        //Si l'email n'existe pas ou si le mot de passe est incorrect on affiche le message défini dans passportConfig.js
        else return res.status(404).json(info);
    })(req, res);
}
