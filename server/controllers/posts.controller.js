const {PostModel} = require('../models/posts.model');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

module.exports = {
    getAll : (req, res) => {
        PostModel.find()
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
        
        const newPost = new PostModel(req.body)
        await newPost.save()
        
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete : true})
        await User.findOne({_id : decodedJWT.payload.id})
            .then(user => {
                user.posts.push(newPost)
                user.confirmPassword = user.password
                user.save()
                .then(user => res.json(user))
                .catch(err => res.status(400).json(err))
            })
            .catch(err => res.status(400).json(err))
    }
}