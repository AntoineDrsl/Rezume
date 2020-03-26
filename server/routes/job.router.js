const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlStudent = require('../controllers/student.controller');
const ctrlJob = require('../controllers/job.controller');
const jwtHelper = require('../config/jwtHelper');



//Définition des variables de stockage Job
const storageJob = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads/job`);
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${file.originalname}.jpg`);
    }
});

var uploadJob = multer({ storage: storageJob});


//JOB
router.post('/createjob', jwtHelper.verifyJwtTokenCompany, ctrlJob.createJob);
router.post('/uploadjobimage', jwtHelper.verifyJwtTokenCompany, uploadJob.single('file'), ctrlJob.uploadImage);
router.get('/getalljob', jwtHelper.verifyJwtTokenStudent, ctrlJob.geAllJob);
router.get('/getselectedjob/:id', jwtHelper.verifyJwtTokenStudent, ctrlJob.getSelectedJob);

//Ajouter CV en favori
router.get('/addjobfavorite/:id', jwtHelper.verifyJwtTokenStudent, ctrlStudent.addJobFavorite);

//Remove CV en favori
router.get('/removejobfavorite/:id', jwtHelper.verifyJwtTokenStudent, ctrlStudent.removeJobFavorite);


module.exports = router;
