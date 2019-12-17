const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');
const CV = mongoose.model('cv');

mongoose.set('useFindAndModify', false);

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


module.exports.getCV = (req, res, next) => {
    CV.findOne({ _user: req._id},
        (err, cv) =>{
            if(!cv) {
                return res.status(404).json({status: false, message: 'Cv not found'});
            }
            else{
                return res.status(200).json({status: true, cv: _.pick(cv, ['user','age','research', 'experience', 'degree'])})
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

module.exports.uploadImage = (req, res, next) => {

    const file = req.file;
    console.log(file.filename);
    if(!file) {
        const error = new Error('Please  upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send(file)
}

module.exports.updateCv = (req, res, next) => {

    var cv = new CV();
    cv._user = req._id;
    cv.age = req.body.age;
    cv.research = req.body.research;
    cv.experience = req.body.experience;
    cv.degree = req.body.degree;

    
    console.log(cv)
    CV.findOneAndUpdate({ _user: req._id}, {$set: {research: req.body.research, experience: req.body.experience}},
        (err, cv) => {
            if(err){

                return res.status(404).json({status: false, message: 'CV not found or other..'});
            }
            else{
 
                return res.status(200).json({ status: true, cv: _.pick(cv, ['_id', 'fullName'])});
            }
        }


    );
}

