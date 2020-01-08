const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlStudent = require('../controllers/student.controller');
const ctrlCV = require('../controllers/cv.controller');
const ctrlCompany = require('../controllers/company.controller')
const ctrlJob = require('../controllers/job.controller');
const jwtHelper = require('../config/jwtHelper');

//Définition des variables de stockage CV
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads/cv`)
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${req._id}.jpg`)
    }
})

var upload = multer({ storage: storage })

//Définition des variables de stockage Job
const storageJob = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads/job`)
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${file.originalname}.jpg`)
    }
})

var uploadJob = multer({ storage: storageJob})

//REGISTER
router.post('/register', ctrlStudent.register);
router.post('/registercompany', ctrlCompany.register)

//AUTHENTICATE
router.post('/authenticate', ctrlStudent.authenticate);

//PROFILES
router.get('/studentprofile', jwtHelper.verifyJwtToken, ctrlStudent.studentProfile);
router.get('/companyprofile', jwtHelper.verifyJwtToken, ctrlCompany.companyProfile)

//CV
router.get('/createcv', jwtHelper.verifyJwtToken, ctrlCV.getIdAndName);
router.post('/createcv', jwtHelper.verifyJwtToken, ctrlCV.createCV);
router.post('/updatecv', jwtHelper.verifyJwtToken, ctrlCV.updateCv);
router.post('/uploadimage', jwtHelper.verifyJwtToken, upload.single('file'), ctrlCV.uploadImage);

//SEE CV
router.get('/getcv', jwtHelper.verifyJwtToken, ctrlCV.getCV);
router.get('/getselectedcv/:id', jwtHelper.verifyJwtToken, ctrlCV.getSelectedCV);
router.get('/getallcv', jwtHelper.verifyJwtToken, ctrlCV.getAllCv);

//JOB
router.post('/createjob', jwtHelper.verifyJwtToken, ctrlJob.createJob);
router.post('/uploadjobimage', jwtHelper.verifyJwtToken, uploadJob.single('file'), ctrlJob.uploadImage)




module.exports = router;