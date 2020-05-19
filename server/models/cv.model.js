const mongoose = require('mongoose');

var cvSchema = new mongoose.Schema({
    _student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    research: String,
    description: String,
    experiences: [
        {
        "name": String,
        "company": String,
        "start": Date,
        "end": Date,
        "description": String
        }
    ],
    degrees: [
        {
        "name": String,
        "date": Date,
        "school": String
        }
    ],
    img_path: String
}, {
    timestamps: true
});

mongoose.model('cv', cvSchema);









