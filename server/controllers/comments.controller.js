const Comment = require('../models/comments.model');

module.exports = {
    getAll : (req, res) => {
        Comment.find()
            .then(comments => res.json(comments))
            .catch(err => res.json(err))
    },

    getOne : (req, res) => {
        Comment.findOne(req.params)
            .then(comment => res.json(comment))
            .catch(err => res.json(err))
    },

    newComment : (req, res) => {
        Comment.create(req.body)
            .then(comment => res.json(comment))
            .catch(err => res.status(400).json(err))
    },

    updateComment : (req, res) => {
        Comment.findOneAndUpdate(req.params, req.body, {new : true, runValidators : true})
            .then(update => res.json(update))
            .catch(err => res.status(400).json(err))
    },

    deleteComment : (req, res) => {
        Comment.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    }
}