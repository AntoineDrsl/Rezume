const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var companySchema = new mongoose.Schema({

    company_name: {
        type: String,
        required: 'Company name cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    description: {
        type: String,
        required: 'Description cannot be empty'
    },
    siret: {
        type: String,
        // required: 'Siret field cannot be empty'
    },
    favorites: [
        { 
            type: String
        }
    ],
    password: {
        type: String,
        required: 'Password cannot be empty',
        minlength: [8, 'Password must be atleast 8 character long']
    },
    saltSecret: String


},
{
    strict: true
}
);

// Custom validation for email
companySchema.path('email').validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, 'Invalid e-mail.');


// Events
companySchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


companySchema.pre('findOneAndUpdate', function (next) {
    if(this.getUpdate().$set) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.getUpdate().$set.password, salt, (err, hash) => {
                this.getUpdate().$set.password = hash;
                this.saltSecret = salt;
                next();
            });
        });
    } else {
        next();
    }
});


// Methods
companySchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}; //Return true or false

companySchema.methods.generateJwt = function (req) {
    return jwt.sign({ _id: this._id, statut: req.body.statut },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    }); //On utilise le JWT_SECRET et JWT_EXP définis dans config.json
}

mongoose.model('Company', companySchema);
