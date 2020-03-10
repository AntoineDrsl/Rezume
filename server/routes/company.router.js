const express = require('express');
const router = express.Router();

const ctrlCompany = require('../controllers/company.controller');
const jwtHelper = require('../config/jwtHelper');


//PROFILES
router.get('/companyprofile', jwtHelper.verifyJwtTokenCompany, ctrlCompany.companyProfile);
router.get('/companyprofile/:id', jwtHelper.verifyJwtToken, ctrlCompany.getCompanyProfileId);


module.exports = router;
