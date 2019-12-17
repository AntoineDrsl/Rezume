const mongoose = require('mongoose');

var cvSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    age: String,
    research: String,
    experience: [
        { type: String } 
    ],
    degree: [
        { type: String }
    ],
    img_path: String
}, {
    timestamps: true
});

mongoose.model('cv', cvSchema);