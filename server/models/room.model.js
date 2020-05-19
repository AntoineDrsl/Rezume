const mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    name: String,
    _id_message: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Chat'
    },
    _id_users: {
        "student": { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        "company": { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    }
});

mongoose.model('Room', roomSchema);