const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    _company: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company'
    },
    title: String,
    content: String,
    img_path: String
}, 
{ 
    timestamps: true,
});


mongoose.model('Post', postSchema);