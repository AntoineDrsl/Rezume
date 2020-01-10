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

module.exports.companyProfile = (req, res, next) => {
    Company.findOne({ _id: req._id },
        (err, company) => {
            if (!company) {
                return res.status(404).json({ status: false, message: 'Company record not found'});
            } else {
                return res.status(200).json({ status: true, company});
            }
        }
    );
}

module.exports.addFavorite = (req, res, next) => {

    var companyFavorite = new Company();
    companyFavorite.favorites = req.params.id;

    Company.findOneAndUpdate({_id: req._id}, {$push: {favorites: companyFavorite.favorites}},
        (err, user) => { 
            if(!user){
                // Reponse status 409: Conflict (La requête ne peut être traitée en l’état actuel.)
                return res.status(409).json({status: false, message: 'User not found', erreur: err});
            }
            else{
                return res.status(200).json({status: true, user});
            }
        }
    );
}

module.exports.removeFavorite = (req, res, next) => {
    Company.findOneAndUpdate({_id: req._id}, {$pull: {favorites: req.params.id}},
        (err, user) => {
            if(!user){
                // Reponse status 409: Conflict (La requête ne peut être traitée en l’état actuel.)
                return res.status(409).json({status: false, message: 'User not found', erreur: err});
            }
            else{
                return res.status(200).json({status: true, user});
            }
        }
    );
}

module.exports.getCompanyProfileId = (req, res, next) => {
    Company.findOne({_id: req.params.id},
        (err, company) => {
            if(!company){
                return res.status(409).json({status: false, message: 'Company not found', erreur: err});
            }
            else{
                return res.status(200).json({status: true, company});
            }
        }
    );
}