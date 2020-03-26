const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    _company: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company'
    },
    content: String
    }, {
    timestamps: true
});


mongoose.model('Post', postSchema);