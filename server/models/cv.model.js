const mongoose = require('mongoose');

var cvSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    age: Number,
    research: String,
    experience: [
        { type: String } 
    ],
    degree: [
        { type: String }
    ]
}, {
    timestamps: true
});

mongoose.model('cv', cvSchema);