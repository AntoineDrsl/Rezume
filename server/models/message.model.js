const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    _id_room: {
        type: String
    },
    sender: String,
    content: String

});

mongoose.model('Message', messageSchema);