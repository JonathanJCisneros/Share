const mongoose = require('mongoose');
const {PostSchema} = require('./posts.model')
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First Name is required"],
        minlength : [2, "First Name must be at least 2 characters long"]
    },

    lastName : {
        type : String,
        required : [true, "Last Name is required"],
        minlength : [2, "Last Name must be at least 2 characters long"]
    },

    animal : {
        type : String,
        required : [true, "Avatar is required"]
    },

    color : {
        type : String,
        required : [true, "Color is required"]
    },

    email : {
        type : String,
        required : [true, "Email is required"],
        validate : {
            validator : val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message : "Please enter a valid email"
        }
    },

    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [8, "Password must be 8 characters or longer"]
    },

    posts : [PostSchema]
}, {timestamps : true});

UserSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword )
    .set( value => this.confirmPassword = value );


UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password and Confirm Password must match');
    }
    next();
});


UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
    });
});


module.exports = mongoose.model('User', UserSchema)
