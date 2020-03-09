const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlStudent = require('../controllers/student.controller');
const ctrlCV = require('../controllers/cv.controller');
const ctrlCompany = require('../controllers/company.controller');
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
router.get('/studentprofile', jwtHelper.verifyJwtTokenStudent, ctrlStudent.studentProfile);
router.get('/studentprofile/:id', jwtHelper.verifyJwtTokenCompany, ctrlStudent.getStudentProfile);
router.get('/companyprofile', jwtHelper.verifyJwtTokenCompany, ctrlCompany.companyProfile);
router.get('/companyprofile/:id', jwtHelper.verifyJwtToken, ctrlCompany.getCompanyProfileId);

//CV
router.get('/createcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.getIdAndName);
router.post('/createcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.createCV);
router.post('/updatecv', jwtHelper.verifyJwtTokenStudent, ctrlCV.updateCv);
router.post('/uploadimage', jwtHelper.verifyJwtTokenStudent, upload.single('file'), ctrlCV.uploadImage);

//SEE CV
router.get('/getcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.getCV);
router.get('/getselectedcv/:id', jwtHelper.verifyJwtTokenCompany, ctrlCV.getSelectedCV);
router.get('/getallcv', jwtHelper.verifyJwtTokenCompany, ctrlCV.getAllCv);

//JOB
router.post('/createjob', jwtHelper.verifyJwtTokenCompany, ctrlJob.createJob);
router.post('/uploadjobimage', jwtHelper.verifyJwtTokenCompany, uploadJob.single('file'), ctrlJob.uploadImage)
router.get('/getalljob', jwtHelper.verifyJwtTokenStudent, ctrlJob.geAllJob);
router.get('/getselectedjob/:id', jwtHelper.verifyJwtTokenStudent, ctrlJob.getSelectedJob);

//Ajouter CV en favori
router.get('/addfavorite/:id', jwtHelper.verifyJwtTokenCompany, ctrlCompany.addFavorite);
router.get('/addjobfavorite/:id', jwtHelper.verifyJwtTokenStudent, ctrlStudent.addJobFavorite);

//Remove CV en favori
router.get('/removefavorite/:id', jwtHelper.verifyJwtTokenCompany, ctrlCompany.removeFavorite);
router.get('/removejobfavorite/:id', jwtHelper.verifyJwtTokenStudent, ctrlStudent.removeJobFavorite);


module.exports = router;