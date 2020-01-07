const mongoose = require('mongoose');
const _ = require('lodash');

const Company = mongoose.model('Company');
const Job = mongoose.model('Job');

mongoose.set('useFindAndModify', false);

module.exports.createJob = (req, res, next) => {
    
    var job = new Job();
    job._company = req._id;
    job.sector = req.body.sector;
    job.description = req.body.description;
    job.experience = req.body.experience;
    job.degrees = req.body.degrees;
    job.save((err, doc) => {
        if(!err){
            job.img_path = `server/uploads/job/Photo_${job._id}`;
            job.save((err, doc) => {
                if(!err) {           
                    res.send(doc);
                } else {
                    return next(err);
                }
            })
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