const mongoose = require('mongoose');
const validateMongodbId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('This ID is not valid/ not found');

};

module.exports = validateMongodbId;