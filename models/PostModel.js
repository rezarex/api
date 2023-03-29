const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    desc:{
        type:String,
        required:true,
    },
    body: {
        type:String,
        required:true,
    },
    photo:{
        type:String,
        default:"default.jpg",
    },
    author:{
        type: String,
        default: "Admin",
    },
    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    is_active: {
        type: Boolean,
        default: true,
        select: false
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Post', postSchema);