const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: "Le nom de l'entreprise ne peut être vide",
    },
    email: {
        type: String,
        required: "L'adresse email ne peut être vide",
        unique: true,
    },
    description: {
        type: String,
        required: "La description ne peut être vide",
    },
    siret: {
        type: String,
        required: "Le siret ne peut être vide",
    },
    favorites: [{ type: String }],
    password: {
        type: String,
        required: "Le mot de passe ne peut être vide",
        minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
    },
    saltSecret: String,
}, {
    strict: true,
});

// Custom validation for email
companySchema.path("email").validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, "Invalid e-mail.");

// Events
companySchema.pre("save", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

companySchema.pre("findOneAndUpdate", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.getUpdate().$set.password, salt, (err, hash) => {
            this.getUpdate().$set.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods
companySchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; //Return true or false

companySchema.methods.generateJwt = function(req) {
    return jwt.sign({ _id: this._id, statut: req.body.statut },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP,
        }
    ); //On utilise le JWT_SECRET et JWT_EXP définis dans config.json
};

mongoose.model("Company", companySchema);