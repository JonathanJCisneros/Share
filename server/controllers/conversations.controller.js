const Conversation = require('../models/conversation.model')

module.exports = {
    getAll : (req, res) => {
        Conversation.find()
            .then(list => res.json(list))
            .catch(err => res.json(err))
    },

    getOne : (req, res) => {
        Conversation.find({members : {$in : [req.params.userId]}})
            .then(conversation => res.json(conversation))
            .catch(err => res.status(400).json(err))
    },

    newConversation : (req, res) => {
        Conversation.create({members : [req.body.senderId, req.body.receiverId]})
            .then(conversation => res.json(conversation))
            .catch(err => res.status(400).json(err))
    },

    deleteOne : (req, res) => {
        Conversation.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    }
}