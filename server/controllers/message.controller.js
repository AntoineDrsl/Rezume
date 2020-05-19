const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Message = mongoose.model('Message');

module.exports.getAllUserMessages = (req, res, next) => {
    Message.find({$and: [
        {receiver: req._id},
        {status: false}
        ]},
        (err, messages) => {
            if(err){
                return res.status(409).json({status: false, message: err});
            }
            else{
                if(messages.length <= 0){
                    return res.status(200).json({status: true, isUnread: false});
                } else {
                    return res.status(200).json({status: true, isUnread: true});
                }
            }
        });
};
