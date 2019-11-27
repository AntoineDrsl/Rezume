const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    firstname: {
        type: String,
        required: 'Fisrt name can\'t be empty'
    },    
    email: {
        type: String,
        required: 'Email name can\'t be empty',
        unique: true
    },
    age: {
        type: Number,
        required: 'You do have an age, don\'t lie',
    },
    password: {
        type: String,
        required: 'Password name can\'t be empty',
        minlength : [4, 'Password must be atleast 4 characters long']
    },
    saltSecret: String,

    //NOT VISIBLE
    id_cv: Number,
});
