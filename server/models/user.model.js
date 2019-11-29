const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    status: String,
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password must be atleast 8 character long']
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, 'Invalid e-mail.');


// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}; //Return true or false

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    }); //On utilise le JWT_SECRET et JWT_EXP définis dans config.json
}

mongoose.model('User', userSchema);