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

        const newComment = new CommentModel(req.body)
        await newComment.save()

        await PostModel.findOne({_id : newComment.postId})
            .then(post => {
                post.comments.push(newComment)
                post.save()
                .then(post => res.json(post))
                .catch(err => res.status(400).json(err))
            })
            .catch(err => res.status(400).json(err))
    }
}