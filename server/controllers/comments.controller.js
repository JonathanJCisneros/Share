const {CommentModel} = require('../models/comments.model');
const jwt = require('jsonwebtoken');
const {PostModel} = require('../models/posts.model')

module.exports = {
    getAll : (req, res) => {
        CommentModel.find()
            .then(comments => res.json(comments))
            .catch(err => res.json(err))
    },

    getOne : (req, res) => {
        CommentModel.findOne(req.params)
            .then(comment => res.json(comment))
            .catch(err => res.json(err))
    },

    
    updateComment : (req, res) => {
        CommentModel.findOneAndUpdate(req.params, req.body, {new : true, runValidators : true})
        .then(update => res.json(update))
        .catch(err => res.status(400).json(err))
    },
    
    deleteComment : (req, res) => {
        CommentModel.deleteOne(req.params)
        .then(deleteConfirm => res.json(deleteConfirm))
        .catch(err => res.json(err))
    },
    
    newComment : async(req, res) => {

        try{
            const newComment = new CommentModel(req.body)
            await newComment.save()
            await PostModel.findOneAndUpdate({_id : newComment.postId}, {$push : {comments : newComment}})
            res.json(newComment)
        }catch(err){
            res.status(400).json(err)
        }
    }
}