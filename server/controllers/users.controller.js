const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    getAll : (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err))
    },


    register : (req, res) => {
        User.find({email : req.body.email})
            .then(userEmail => {
                if(userEmail.length === 0){
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({id : user._id, firstName : user.firstName, lastName : user.lastName, email : user.email}, process.env.SECRET_KEY);
                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
                                .json(user);
                        })
                        .catch(err => res.status(400).json(err));
                }
                else{
                    res.status(400).json({errors: {email : {message : "Email is already taken, please provide another"}}})
                }
            })
            .catch(err => res.status(400).json(err))
    },


    login : async(req, res) => {
        const user = await User.findOne({ email : req.body.email });
        if(user === null) {
            return res.status(400).json({errors : {email : {message : "Invalid or Incorrect Email"}}});
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.status(400).json({errors : {password : {message : "Incorrect Password"}}});
        }
        const userToken = jwt.sign({id : user._id, firstName : user.firstName, lastName : user.lastName, email : user.email}, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly : true})
            .json(user);
    },


    logout : (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    deleteUser : (req, res) => {
        User.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    }
}