const mongoose = require('mongoose');

var hahstagSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Hashtag', hahstagSchema);