const express = require('express');
const router = express.Router();

const ctrlHashtag = require('../controllers/hashtag.controller');
const jwtHelper = require('../config/jwtHelper');

// GET
router.get('/hashtag', jwtHelper.verifyJwtToken, ctrlHashtag.getAllHashtag);

// POST
router.post('/addhashtag', jwtHelper.verifyJwtToken, ctrlHashtag.addHashtag);


module.exports = router;