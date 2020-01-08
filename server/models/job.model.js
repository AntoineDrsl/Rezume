const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    _company: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company'
    },
    sector: String,
    description: String,
    experience: String,
    degrees: [
        { type: String }
    ],
    img_path: String
}, {
    timestamps: true
});

mongoose.model('Job', jobSchema);