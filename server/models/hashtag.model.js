const mongoose = require('mongoose');

var hahstagSchema = new mongoose.Schema({
    categorie: String,
    name: String,
    used_count: Number
});

mongoose.model('Hashtag', hahstagSchema);