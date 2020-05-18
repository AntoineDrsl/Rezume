const mongoose = require('mongoose');

var cvSchema = new mongoose.Schema({
    _student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    age: String,
    description: String,
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









