const User = require('../models/users.model')

module.exports = {
    getAll : (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err))
    },

    register : (req, res) => {
        User.create(req.body)
            .then(user => res.json({msg : "success!", user : user}))
            .catch(err => res.json(err))
    }
}