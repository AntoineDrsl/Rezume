const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log('MongoDB connection succeeded.');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./student.model');
require('./cv.model');
require('./company.model');
require('./post.model');
require('./hashtag.model');
require('./room.model');
require('./message.model');