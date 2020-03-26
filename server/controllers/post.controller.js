const mongoose = require('mongoose');
const _ = require('lodash');

const Company = mongoose.model('Company');
const Post = mongoose.model('Post');

mongoose.set('useFindAndModify', false);

module.exports.createPost = (req, res, next) => {

    var post = new Post();
    post._company = req._id;
    post.content = req.body.content;
    post.img_path = `server/uploads/post/Post_${req.body.image.substring(12)}`;
    post.save((err, doc) => {
        if(!err){
            res.send(doc);
        } else{
            return next(err);
        }
    });
}


module.exports.uploadImage = (req, res, next) => {

    const file = req.file;
    if(!file) {
        const error = new Error('Please  upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
}


module.exports.getAllPost = (req, res, next) => {
    Post.find(
        {},
        (err, post) => {
            if(!post) {
                return res.status(500).json({status: false, message: 'Cannot load all posts'});
            }
            else{
                return res.status(200).json({status: true, post});
            }
        }
    );
}


module.exports.deletePost = (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.id},
        (err, post) => {
            if(!post){
                return res.status(409).json({status: false, message: 'post not found', erreur: err});
            }
            else {
                return res.status(200).json({status: true, post});
            }
        }
    );
}


