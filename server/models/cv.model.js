const mongoose = require('mongoose');

var cvSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    age: String,
    research: String,
    experiences: [
        { type: String } 
    ],
    degrees: [
        { type: String }
    ],
    img_path: String
}, {
    timestamps: true
});

mongoose.model('cv', cvSchema);