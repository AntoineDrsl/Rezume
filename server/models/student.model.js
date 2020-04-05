const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Fullname cannot be empty'
    },
    lastName: {
        type: String,
        required: 'Lastname cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    favorites: [
        { type: String }
    ],
    hashtag: [
        { type: String }
    ],
    password: {
        type: String,
        required: 'Password cannot be empty',
        minlength: [8, 'Password must be atleast 8 character long']
    },
    saltSecret: String
});

// Custom validation for email
studentSchema.path('email').validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, 'Invalid e-mail.');


// Events
studentSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods

studentSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}; //Return true or false

studentSchema.methods.generateJwt = function (req) {
    return jwt.sign({ _id: this._id, statut: req.body.statut },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    }); //On utilise le JWT_SECRET et JWT_EXP définis dans config.json
}

mongoose.model('Student', studentSchema);