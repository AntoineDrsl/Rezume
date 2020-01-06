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
