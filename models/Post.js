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
    photo:{
        type:String,
        required:false,
    },
    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    ratings: {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }
}, {
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Post', postSchema);