const mongoose = require('mongoose');
const {CommentSchema} = require('./comments.model')

const PostSchema = new mongoose.Schema({
    animal : String,
    
    color : String,

    userId : String,
    
    title : {
        type : String,
        required : [true, "Title is required"],
        minlength : [2, "Title must be at least 2 characters long"]
    },

    content : {
        type : String,
        requried : [true, "Content is required"],
        minlength : [5, "Content must be at least 5 characters long"]
    },

    likes : Number,

    comments : [CommentSchema]
}, {timestamps : true});

module.exports = {
    PostModel : mongoose.model('Post', PostSchema),
    PostSchema
}