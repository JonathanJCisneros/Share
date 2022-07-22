const User = require('../models/users.model')

module.exports = {
    getAll : (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err))
    },

    register : (req, res) => {
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id, firstName : user.firstName, lastName : user.lastName}, process.env.SECRET_KEY);
            res
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
    },

    login : async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            return res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }
        const userToken = jwt.sign({id: user._id, firstName : user.firstName, lastName : user.lastName}, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
            .json({ msg: "success!" });
    },

    logout : (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}