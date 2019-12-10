const mongoose = require('mongoose');
const passport = require('passport');
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
    cv.experience = req.body.experience;
    cv.degree = req.body.degree;
    cv.save((err, doc) => {
        if(!err){
            res.send(doc);
        } else {
            return next(err);
        }
    })
}