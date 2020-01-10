const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Student = mongoose.model('Student');
const CV = mongoose.model('cv');

module.exports.register = (req, res, next) => {
    var student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    studentEmail = req.body.email.toLowerCase();
    student.email = studentEmail;
    student.status = req.body.status;
    student.password = req.body.password;
    student.save((err, doc) => {
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
    passport.authenticate('local', (err, student, info) => {
        //Si il y a une erreur on la retourne
        if (err) return res.status(400).json(err);
        //Si student est retourné (seulement si ça réussi), on crée un JsonWebToken grâce à la méthode définie dans student.model.js
        else if (student) return res.status(200).json({ "token": student.generateJwt() });
        //Si l'email n'existe pas ou si le mot de passe est incorrect on affiche le message défini dans passportConfig.js
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.studentProfile = (req, res, next) => {
    Student.findOne({ _id: req._id },
        (err, student) => {
            if (!student) {
                return res.status(404).json({ status: false, message: 'Student record not found'});
            } else {
                return res.status(200).json({ status: true, student: _.pick(student, ['firstName', 'lastName', 'email']) });
            }
        }
    );
}


module.exports.getStudentProfile = (req, res, next) => {
    Student.findOne({_id: req.params.id}, 
        (err, student) => {
            if (!student) {
                return res.status(404).json({ status: false, message: 'Student record not found'});
            } else {
                return res.status(200).json({ status: true, student});
            }
        }
    );
}