const express = require('express');
const router = express.Router();

const ctrlStudent = require('../controllers/student.controller');
const ctrlCompany = require('../controllers/company.controller');


//REGISTER
router.post('/register', ctrlStudent.register);
router.post('/registercompany', ctrlCompany.register);

//AUTHENTICATE
router.post('/authenticate', ctrlStudent.authenticate);


module.exports = router;
