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
        callBack(null, `./uploads/job`);
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${file.originalname}.jpg`);
    }
});

var uploadJob = multer({ storage: storageJob});




module.exports = router;