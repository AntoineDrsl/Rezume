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

    CV.findOne({_student: req._id},
        (err, cv) => {
            if(!cv){
                var cv = new CV();
                cv._student = req._id;
                cv.description = req.body.description;
                cv.research = req.body.research;
                for(var i=0; req.body.experiences.length > i; i++) {
                    console.log(req.body.experiences);
                    var newExperience = {
                        name: req.body.experiences[i].experienceName,
                        company: req.body.experiences[i].experienceCompany,
                        start: req.body.experiences[i].experienceStart,
                        end: req.body.experiences[i].experienceEnd,
                        description: req.body.experiences[i].experienceDescription
                    }
                    cv.experiences.push(newExperience);
                }
                for(var i=0; req.body.degrees.length > i; i++) {
                    var newDegree = {
                        name: req.body.degrees[i].degreeName,
                        date: req.body.degrees[i].degreeDate,
                        school: req.body.degrees[i].degreeSchool
                    }
                    cv.degrees.push(newDegree);
                }
                cv.img_path = `server/uploads/cv/Photo_${req._id}`;
                cv.save((err, doc) => {
                    if(!err){
                        // res.send(doc._id);
                        res.status(200).json({ status: true, doc});
                    } else {
                        return next(err);
                    }
                });
            }
            else{
                return res.status(409).json({status: false, message: 'Cv already on DB', cv});
            }
        }
    );

    
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


