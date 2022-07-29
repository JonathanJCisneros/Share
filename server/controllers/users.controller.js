const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    getAll : (req, res) => {
        User.find().populate('posts')
            .exec((err, user) => {
                err?
                    res.status(400).json(err):
                    res.json(user)
            })
    },

    getOne : (req, res) => {
        User.findOne(req.params)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    
    register : (req, res) => {
        User.find({email : req.body.email})
            .then(userEmail => {
                if(userEmail.length === 0){
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({id : user._id}, process.env.SECRET_KEY);
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
        const userToken = jwt.sign({id : user._id}, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly : true})
            .json(user);
    },


    checkIfUser : (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete : true})
        
        User.findOne({_id : mongoose.Types.ObjectId(decodedJWT.playload.id)})
            .then(user => res.json(user))
            .catch(err => console.log(decodedJWT) + res.json(err))
    },


    logout : (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    updateUser : (req, res) => {
        User.findOneAndUpdate(req.params, req.body, {new : true, runValidators : true})
            .then(update => res.json(update))
            .catch(err => res.status(400).json(err))
    },

    deleteUser : (req, res) => {
        User.deleteOne(req.params)
            .then(deleteConfirm => res.json(deleteConfirm))
            .catch(err => res.json(err))
    }
}