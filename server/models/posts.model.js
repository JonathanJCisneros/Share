const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    animal : String,
    
    color : String,
    
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

    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }]
}, {timestamps : true});

module.exports = {
    PostModel : mongoose.model('Post', PostSchema),
    PostSchema
}