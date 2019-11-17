const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

//define URL '/api/register' to call the function register
router.post('/register', ctrlUser.register);

module.exports = router;