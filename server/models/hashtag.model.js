const mongoose = require('mongoose');

var hahstagSchema = new mongoose.Schema({
    name: String,
    used_count: Number
});

mongoose.model('Hashtag', hahstagSchema);