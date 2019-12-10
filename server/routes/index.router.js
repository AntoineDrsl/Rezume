const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlCV = require('../controllers/cv.controller');
const jwtHelper = require('../config/jwtHelper');

//define URL '/api/register' to call the function register
router.post('/register', ctrlUser.register);

//définie l'URL '/api/authenticate' pour appeler la fonction authenticate
router.post('/authenticate', ctrlUser.authenticate);

//définie l'URL '/api/userProfile' pour appeler la fonction userProfile 
//Ici on utilise get car on va prendre des infos, pas en envoyer
//On appelle la fonction verifyJwtToken() de jwtHelper pour sécuriser l'accès à cette page
router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// '/api/createcv'
router.get('/createcv', jwtHelper.verifyJwtToken, ctrlCV.getIdAndName);
router.post('/createcv', jwtHelper.verifyJwtToken, ctrlCV.createCV);

module.exports = router;