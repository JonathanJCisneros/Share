const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    animal : String,

    color : String,

    postId : String,

    userId : String,

    comment : {
        type : String,
        required : [true, "Cannot post empty comments"],
        minlength : [3, "Comment must be at least 3 characters long"]
    },

    likes : Number
}, {timestamps : true});

module.exports = {
    CommentModel : mongoose.model('Comment', CommentSchema),
    CommentSchema
}