const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlCompany = require('../controllers/company.controller');
const ctrlPost = require('../controllers/post.controller');
const jwtHelper = require('../config/jwtHelper');


//Définition des variables de stockage Post
const storagePost = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, `./uploads/post`);
    },
    filename: (req, file, callBack) => {
        callBack(null, `Post_${file.originalname}`);
    }
});

var uploadPost = multer({ storage: storagePost});


//POST
router.post('/createpost', jwtHelper.verifyJwtTokenCompany, ctrlPost.createPost);
router.post('/uploadimagepost', jwtHelper.verifyJwtTokenCompany, uploadPost.single('file'), ctrlPost.uploadImage);

router.get('/getallpost', jwtHelper.verifyJwtToken, ctrlPost.getAllPost);
router.post('/deletepost/:id', jwtHelper.verifyJwtTokenCompany, ctrlPost.deletePost);

module.exports = router;