const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlStudent = require('../controllers/student.controller');
const ctrlCV = require('../controllers/cv.controller');
const jwtHelper = require('../config/jwtHelper');

//Définition des variables de stockage
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads`)
    },
    filename: (req, file, callBack) => {
        callBack(null, `Photo_${req._id}.jpg`)
    }
})

var upload = multer({ storage: storage })

//define URL '/api/register' to call the function register
router.post('/register', ctrlStudent.register);

//définie l'URL '/api/authenticate' pour appeler la fonction authenticate
router.post('/authenticate', ctrlStudent.authenticate);

//définie l'URL '/api/studentProfile' pour appeler la fonction studentProfile 
//Ici on utilise get car on va prendre des infos, pas en envoyer
//On appelle la fonction verifyJwtToken() de jwtHelper pour sécuriser l'accès à cette page
router.get('/studentprofile', jwtHelper.verifyJwtToken, ctrlStudent.studentProfile);

// '/api/createcv'
router.get('/createcv', jwtHelper.verifyJwtToken, ctrlCV.getIdAndName);
router.post('/createcv', jwtHelper.verifyJwtToken, ctrlCV.createCV);

//on recupere le cv 
router.get('/getcv', jwtHelper.verifyJwtToken, ctrlCV.getCV);

//on recupere le cv selectionne par le student
router.get('/getselectedcv/:id', jwtHelper.verifyJwtToken, ctrlCV.getSelectedCV);

//on update le cv
router.post('/updatecv', jwtHelper.verifyJwtToken, ctrlCV.updateCv);

router.post('/uploadimage', jwtHelper.verifyJwtToken, upload.single('file'), ctrlCV.uploadImage);


//on recupere tous les cv dans mongoDB
router.get('/getallcv', jwtHelper.verifyJwtToken, ctrlCV.getAllCv);


module.exports = router;