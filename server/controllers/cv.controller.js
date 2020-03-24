const mongoose = require('mongoose');
const _ = require('lodash');

const Student = mongoose.model('Student');
const CV = mongoose.model('cv');


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
    CV.findOne({ _student: req._id},
        (err, cv) =>{
            if(!cv) {
                return res.status(404).json({status: false, message: 'Cv not found'});
            }
            else{
                return res.status(200).json({status: true, cv: _.pick(cv, ['student','age','research', 'experiences', 'degrees'])});
            }
        }

    );
}

module.exports.getSelectedCV = (req, res, next) => {

    
    CV.findOne({_id: req.params.id},
        (err, cv) =>{
            if(!cv) {
                return res.status(404).json({status: false, message: 'Cv not found'});
            }
            else{
                return res.status(200).json({status: true, cv: _.pick(cv, ['student','age','research', 'experiences', 'degrees'])});
            }
        }
    );
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
        const error = new Error('Please  upload a file')
        error.httpStatusCode = 400
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

module.exports.searchBy = (req, res, next) => {


    let queryField = [];
    for(const key in req.query){
        if(req.query[key] == ''){
            console.log('query empty');
        }
        else{
            queryField.push(req.query[key]);
        }
    }

    console.log(queryField);

    CV.find(
        {hashtag: {$all: queryField}},
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
