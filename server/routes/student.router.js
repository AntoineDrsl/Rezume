const express = require('express');
const router = express.Router();

const ctrlStudent = require('../controllers/student.controller');
const jwtHelper = require('../config/jwtHelper');


//PROFILES
router.get('/getstudents', jwtHelper.verifyJwtToken, ctrlStudent.getStudents);
router.get('/studentprofile', jwtHelper.verifyJwtTokenStudent, ctrlStudent.studentProfile);
router.get('/studentprofile/:id', jwtHelper.verifyJwtTokenCompany, ctrlStudent.getStudentProfile);
router.get('/searchprofile/:arr', jwtHelper.verifyJwtTokenCompany, ctrlStudent.searchProfile);

//UPDATE
router.post('/updatestudent', jwtHelper.verifyJwtTokenStudent, ctrlStudent.updateStudent);


//FAVORITES
router.get('/getfavoritescompanies', jwtHelper.verifyJwtTokenStudent, ctrlStudent.getAllFavorites);
// router.post('/removefavorite/:id', jwtHelper.verifyJwtTokenStudent, ctrlStudent.removeFavorite);

module.exports = router;
