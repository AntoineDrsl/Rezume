const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Student = mongoose.model('Student');
var Company = mongoose.model('Company')

passport.use(
    //On détermine les conditions de connexion (ici, on utilisera le mail plutôt que le username)
    new localStrategy({ usernameField: 'email', passReqToCallback: true},
        (req, username, password, done) => {
            if(req.body.statut == "student") {
                Student.findOne({ email: username },
                    (err, student) => {
                        //Si il y a une erreur on la retourne
                        if (err) {
                            return done(err);
                        //Si le mail n'est pas trouvé on dit qu'il n'existe pas
                        } else if (!student) {
                            return done (null, false, { message: 'Email is not registered' });
                        //On vérifie si le mot de passe correspond avec la méthode verifyPassword() définie dans student.model.js    
                        } else if (!student.verifyPassword(password)) {
                            return done(null, false, { message: 'Wrong password' });
                        //Si la connexion fonctionne
                        } else {
                            return done(null, student);
                        }
                    }
                );
            } else if(req.body.statut == "company") {
                Company.findOne({ email: username },
                    (err, company) => {
                        //Si il y a une erreur on la retourne
                        if (err) {
                            return done(err);
                        //Si le mail n'est pas trouvé on dit qu'il n'existe pas
                        } else if (!company) {
                            return done (null, false, { message: 'Email is not registered' });
                        //On vérifie si le mot de passe correspond avec la méthode verifyPassword() définie dans company.model.js    
                        } else if (!company.verifyPassword(password)) {
                            return done(null, false, { message: 'Wrong password' });
                        //Si la connexion fonctionne
                        } else {
                            return done(null, company);
                        }
                    }
                );
            } else {
                return done(null, false, {message: 'Statut not defined'});
            }
        })
);