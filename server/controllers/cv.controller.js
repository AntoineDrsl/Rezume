const mongoose = require('mongoose');
const _ = require('lodash');

const Student = mongoose.model('Student');
const CV = mongoose.model('cv');

const ObjectId = mongoose.Types.ObjectId;

mongoose.set('useFindAndModify', false);

module.exports.getIdAndName = (req, res, next) => {
    
    Student.findOne({ _id: req._id },
        (err, student) => {
            if (!student) {
                return res.status(404).json({ status: false, message: 'User not found'});
            } else {
                return res.status(200).json({ status: true, student: _.pick(student, ['_id', 'fullName'])});
            }
        }
    );

}

module.exports.getCV = (req, res, next) => {
    CV.aggregate([
        {
            $match: {_student: ObjectId(req._id)}
        },
        {
            $lookup: {
                from: "students",
                localField: "_student",
                foreignField: "_id",
                as: "student"
            }
        }
    ],
    (err, cv) => {
        if(!cv) {
            return res.status(409).json({ status: false, message: 'Cv cannot be loaded' });
        }
        else {
            return res.status(200).json({status: true, cv});
        }
    });
}

module.exports.getSelectedCV = (req, res, next) => {

    CV.aggregate([
        {
            $match: {_id: ObjectId(req.params.id)}
        },
        {
            $lookup: {
                from: "students",
                localField: "_student",
                foreignField: "_id",
                as: "student"
            }
        }
    ],
    (err, cv) => {
        if(!cv) {
            return res.status(409).json({ status: false, message: 'Cv cannot be loaded' });
        }
        else {
            return res.status(200).json({status: true, cv});
        }
    });
}


module.exports.createCV = (req, res, next) => {
    var cv = new CV();
    cv._student = req._id;
    cv.age = req.body.age;
    cv.research = req.body.research;
    cv.experiences = req.body.experiences;
    cv.degrees = req.body.degrees;
    cv.hashtag = req.body.hashtag;
    cv.img_path = `server/uploads/cv/Photo_${req._id}`;
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
        const error = new Error('Please  upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file)
}

module.exports.updateCv = (req, res, next) => {

    var cvUpdate = new CV();
    cvUpdate._student = req._id;
    cvUpdate.age = req.body.age;
    cvUpdate.research = req.body.research;
    cvUpdate.experiences = req.body.experiences;
    cvUpdate.degrees = req.body.degrees;


    CV.findOneAndUpdate({ _student: req._id}, {$set: {research:  cvUpdate.research, experiences: cvUpdate.experiences, degrees: cvUpdate.degrees, age: cvUpdate.age}},
        (err, cv) => {
            if(err){

                return res.status(500).json({status: false, message: 'CV not found or update impossible'});
            }
            else{
 
                return res.status(200).json({ status: true, cvUpdate: _.pick(cvUpdate, ['_id', 'fullName'])});
            }
        }


    );
}



module.exports.getAllCv = (req, res, next) =>{
    CV.find(
        {},
        (err, cv) =>{
            if(!cv) {
                return res.status(500).json({status: false, message: 'Cannot load all CV'});
            }
            else{
                return res.status(200).json({status: true, cv});
            }
        }
    );
}


module.exports.searchProfil = (req, res, next) => {

    const listCompetence = JSON.parse(req.params.arr);

    CV.find(
        {hashtag: {$all: listCompetence}},
        (err, cv) =>{
            if(!cv) {
                return res.status(500).json({status: false, message: 'Cannot load all CV'});
            }
            else{
                return res.status(200).json({status: true, cv});
            }
        }
    )

}


// Find Cv with the student ID
module.exports.getCvStudentId = (req, res, next) => {
    CV.findOne(
    {
        _student: req.params.id
    }, 
    (err, cv) => {
        if(!cv){
            return res.status(500).json({status: false, message: 'Cannot load CV'});
        }
        else {
            return res.status(200).json({status: true, cv: _.pick(cv, ['_id'])});
        }
    });
}

