const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var subscriberSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
});

//Export the model
module.exports = mongoose.model('Subscriber', subscriberSchema);