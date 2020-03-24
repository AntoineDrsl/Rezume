const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlCompany = require('../controllers/company.controller');
const ctrlPost = require('../controllers/post.controller');
const jwtHelper = require('../config/jwtHelper');

//POST
router.post('/createpost', jwtHelper.verifyJwtTokenCompany, ctrlPost.createPost);
router.get('/getallpost', jwtHelper.verifyJwtTokenCompany, ctrlPost.getAllPost);
router.post('/deletepost/:id', jwtHelper.verifyJwtTokenCompany, ctrlPost.deletePost);
// router.get('/getcompanypost', jwtHelper.verifyJwtTokenCompany, ctrlPost.getCompanyPost);

module.exports = router;