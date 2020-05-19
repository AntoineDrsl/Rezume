const express = require('express');
const router = express.Router();

const ctrlMessage = require('../controllers/message.controller');
const jwtHelper = require('../config/jwtHelper');


//GET
router.get('/getusermessages', jwtHelper.verifyJwtToken, ctrlMessage.getAllUserMessages);

module.exports = router;