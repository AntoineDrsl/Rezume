const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    //On détermine les conditions de connexion (ici, on utilisera le mail plutôt que le username)
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    //Si il y a une erreur on la retourne
                    if (err) {
                        return done(err);
                    //Si le mail n'est pas trouvé on dit qu'il n'existe pas
                    } else if (!user) {
                        return done (null, false, { message: 'Email is not registered' });
                    //On vérifie si le mot de passe correspond avec la méthode verifyPassword() définie dans user.model.js    
                    } else if (!user.verifyPassword(password)) {
                        return done(null, false, { message: 'Wrong password' });
                    //Si la connexion fonctionne
                    } else {
                        return done(null, user);
                    }
                });
        })
);