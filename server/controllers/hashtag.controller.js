const mongoose = require('mongoose');
const _ = require('lodash');

const Hashtag = mongoose.model('Hashtag');
const ObjectId = mongoose.Types.ObjectId;

module.exports.getAllHashtag = (req, res, next) => {
    Hashtag.find(
        (err, hashtag) => {
            if(!hashtag){
                return res.status(500).json({status: false, message: 'Cannot load all hashtag'});
            }
            else {
                return res.status(200).json({status: true, hashtag});
            }
        }
    )
}

module.exports.addHashtag = (req, res, next) => {
    let hashtag = new Hashtag();
    hashtag.categorie = req.body.categorie;
    hashtag.name = req.body.name;
    hashtag.used_count = 0;
    hashtag.save((err, doc) => {
        if(!err){
            res.send(doc);
        } else{
            return next(err);
        }
    });
};
