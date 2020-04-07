const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Student = mongoose.model('Student');
const Company = mongoose.model('Company');
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
    passport.authenticate('local', (err, user, info) => {
        //Si il y a une erreur on la retourne
        if (err) return res.status(400).json(err);
        //Si student est retourné (seulement si ça réussi), on crée un JsonWebToken grâce à la méthode définie dans student.model.js
        else if (user) return res.status(200).json({ "token": user.generateJwt(req) });
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
                return res.status(200).json({ status: true, student});
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

module.exports.addJobFavorite = (req, res, next) => {
    var studentFavorite = new Student();
    studentFavorite.favorites = req.params.id;

    Student.findOneAndUpdate({_id: req._id}, {$push: {favorites: studentFavorite.favorites}},
        (err, student) => {
            if(!student){
                return res.status(409).json({status: false, message: 'Student not found or update failed'});
            }
            else{
                return res.status(200).json({status: true, student});
            }
        }
    );
}

module.exports.removeJobFavorite = (req, res, next) => {
    Student.findOneAndUpdate({_id: req._id}, {$pull: {favorites: req.params.id}},
        (err, student) => {
            if(!student){
                return res.status(409).json({status: false, message: 'Student not found or update failed'});
            }
            else{
                return res.status(200).json({status: true, student});
            }
        }
    );
}

module.exports.getAllFavorites = (req, res, next) => {
    Student.findOne({_id: req._id},
        (err, student) => {
            if (!student) {
                return res.status(404).json({ status: false, message: 'Student not found'});
            } else {
                Company.find({_id: {$in: student.favorites}},
                        (err, favorites) => {
                            return res.status(200).json({ status: true, favorites });
                        }
                    );
            }
        }
    );
}

module.exports.updateStudent = (req, res, next) => {
    var studentUpdate = Student.find({_id: req._id});
    studentUpdate._id = req._id;
    studentUpdate.firstName = req.body.firstName;
    studentUpdate.lastName = req.body.lastName;
    studentUpdate.email = req.body.email.toLowerCase();
    
    if(req.body.password) {
        studentUpdate.password = req.body.password;
    }

    Student.findOneAndUpdate({_id: req._id}, {$set: {firstName: studentUpdate.firstName, lastName: studentUpdate.lastName, email: studentUpdate.email, password: studentUpdate.password }}, { omitUndefined: true,  runValidators: true, context: 'query' },
        (err, student) => {
            if(err) {
                return res.status(500).json({status: false, message: 'Student not found or update impossible'});
            }
            else {
                return res.status(200).json({status: true, student});
            }
        }
    
    )

}
