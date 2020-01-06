const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Student = mongoose.model('Student');

passport.use(
    //On détermine les conditions de connexion (ici, on utilisera le mail plutôt que le studentname)
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
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
                });
        })
);