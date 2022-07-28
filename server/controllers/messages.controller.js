const Message = require('../models/message.model')

module.exports = {
    getAll : (req, res) => {
        Message.find()
            .then(list => res.json(list))
            .catch(err => res.json(err))
    },

    getOne : (req, res) => {
        Message.find({conversationId : req.params.conversationId})
            .then(conversation => res.json(conversation))
            .catch(err => res.status(400).json(err))
    },

    newMessage : (req, res) => {
        Message.create(req.body)
            .then(message => res.json(message))
            .catch(err => res.status(400).json(err))
    },

    deleteOne : (req, res) => {
        Message.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    }
}