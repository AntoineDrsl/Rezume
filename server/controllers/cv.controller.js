const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');
const CV = mongoose.model('cv');

module.exports.getIdAndName = (req, res, next) => {
    
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'User not found'});
            } else {
                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'fullName'])});
            }
        }
    );

}

module.exports.createCV = (req, res, next) => {

    var cv = new CV();
    cv._user = req._id;
    cv.age = req.body.age;
    cv.research = req.body.research;
    cv.experiences = req.body.experiences;
    cv.degrees = req.body.degrees;
    cv.img_path = `server/uploads/Photo_${req._id}`;
    cv.save((err, doc) => {
        if(!err){
            res.send(doc);
        } else {
            return next(err);
        }
    })
}

module.exports.uploadImage = (req, res, next) => {

    const file = req.file;
    if(!file) {
        const error = new Error('Please  upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send(file)
}