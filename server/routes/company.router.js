const express = require('express');
const router = express.Router();

const ctrlCompany = require('../controllers/company.controller');
const jwtHelper = require('../config/jwtHelper');


//PROFILES
router.get('/companyprofile', jwtHelper.verifyJwtTokenCompany, ctrlCompany.companyProfile);
router.get('/companyprofile/:id', jwtHelper.verifyJwtToken, ctrlCompany.getCompanyProfileId);

//UPDATE
router.post('/updatecompany', jwtHelper.verifyJwtTokenCompany, ctrlCompany.updateCompany);

//FAVORITES
router.get('/getfavoritesstudents', jwtHelper.verifyJwtTokenCompany, ctrlCompany.getAllFavorites);

module.exports = router;
