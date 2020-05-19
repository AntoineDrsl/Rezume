const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Le prénom ne peut être vide",
    },
    lastName: {
        type: String,
        required: "Le nom de famille ne peut être vide",
    },
    email: {
        type: String,
        required: "L'email' ne peut être vide",
        unique: true,
    },
    birthDate: {
        type: String,
        required: "La date de naissance ne peut être vide",
    },
    phoneNumber: {
        type: String,
    },
    favorites: [{ type: String }],
    hashtag: [{ type: String }],
    password: {
        type: String,
        required: "le mot de passe ne peut être vide.",
        minlength: [8, "Le mot de passe doit mesurer au moins 8 caractères"],
    },
    saltSecret: String,
});

// Custom validation for email
studentSchema.path("email").validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, "Adresse email invalide.");

// Events
studentSchema.pre("save", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

studentSchema.pre("findOneAndUpdate", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.getUpdate().$set.password, salt, (err, hash) => {
            this.getUpdate().$set.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods

studentSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; //Return true or false

studentSchema.methods.generateJwt = function(req) {
    return jwt.sign({ _id: this._id, statut: req.body.statut },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP,
        }
    ); //On utilise le JWT_SECRET et JWT_EXP définis dans config.json
};

mongoose.model("Student", studentSchema);