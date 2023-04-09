const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var projectSchema = new mongoose.Schema({
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
    projecturl:{
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
    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    skills: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisLiked: {
        type: Boolean,
        default: false,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
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
module.exports = mongoose.model('Project', projectSchema);