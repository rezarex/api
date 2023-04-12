const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var skillSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    ratings: [{
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }],
    totalratings: {
        type: String,
        default: 0,
    },
    images: [],
},
{
   timestamps: true, 
});

//Export the model
module.exports = mongoose.model('Skill', skillSchema);