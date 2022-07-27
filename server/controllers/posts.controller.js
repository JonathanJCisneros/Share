const {PostModel} = require('../models/posts.model');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

module.exports = {
    getAll : (req, res) => {
        PostModel.find({}).sort({ createdAt : -1 })
            .then(posts => res.json(posts))
            .catch(err => res.json(err))
    },

    getOne : (req, res) => {
        PostModel.findOne(req.params)
            .then(post => res.json(post))
            .catch(err => res.json(err))
    },

    updatePost : (req, res) => {
        PostModel.findOneAndUpdate(req.params, req.body, {new : true, runValidators : true})
            .then(update => res.json(update))
            .catch(err => res.status(400).json(err))
    },

    deletePost : (req, res) => {
        PostModel.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    },

    newPost : async(req, res) => {
        
        try{
            const newPost = new PostModel(req.body)
            await newPost.save()
            await User.findOneAndUpdate({_id : newPost.userId}, {$push : {posts : newPost}})
            res.json(newPost)
        }catch(err){
            res.status(400).json(err)
        }
    }
}