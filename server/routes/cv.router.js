const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlCV = require('../controllers/cv.controller');
const ctrlCompany = require('../controllers/company.controller');
const jwtHelper = require('../config/jwtHelper');

//Définition des variables de stockage CV
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads/cv`);
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${file.originalname}`);
    }
})

var upload = multer({ storage: storage });




//CV
router.get('/createcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.getIdAndName);
router.post('/createcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.createCV);
router.post('/updatecv', jwtHelper.verifyJwtTokenStudent, ctrlCV.updateCv);
router.post('/uploadimage', jwtHelper.verifyJwtTokenStudent, upload.single('file'), ctrlCV.uploadImage);

//SEE CV
router.get('/getcv', jwtHelper.verifyJwtTokenStudent, ctrlCV.getCV);
router.get('/getselectedcv/:id', jwtHelper.verifyJwtTokenCompany, ctrlCV.getSelectedCV);
router.get('/getallcv', jwtHelper.verifyJwtTokenCompany, ctrlCV.getAllCv);
router.get('/searchcv/',jwtHelper.verifyJwtTokenCompany, ctrlCV.searchBy);

//Ajouter CV en favori
router.get('/addfavorite/:id', jwtHelper.verifyJwtTokenCompany, ctrlCompany.addFavorite);

//Remove CV en favori
router.get('/removefavorite/:id', jwtHelper.verifyJwtTokenCompany, ctrlCompany.removeFavorite);


module.exports = router;
