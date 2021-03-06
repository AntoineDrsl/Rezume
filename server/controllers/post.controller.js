const mongoose = require('mongoose');
const _ = require('lodash');

const Company = mongoose.model('Company');
const Post = mongoose.model('Post');

mongoose.set('useFindAndModify', false);

module.exports.createPost = (req, res, next) => {

    var post = new Post();
    post._company = req._id;
    post.content = req.body.content;
    post.title = req.body.title;
    post.img_path = req.body.image.substring(12);
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
    // Post.find(
    //     {},
    //     (err, post) => {
    //         if(!post) {
    //             return res.status(500).json({status: false, message: 'Cannot load all posts'});
    //         }
    //         else{
    //             return res.status(200).json({status: true, post});
    //         }
    //     }
    // );

    Post.aggregate([
        {
            $lookup: {
                from: 'companies',
                localField: '_company',
                foreignField: '_id',
                as: 'companyDetails'
              }
        }
    ],
    (err, posts) => {
        if(!posts) {
            return res.status(409).json({ status: false, message: 'All posts cannot be loaded' });
        }
        else {
            return res.status(200).json({status: true, posts});
        }
    });
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


