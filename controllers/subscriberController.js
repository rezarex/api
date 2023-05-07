const Subscriber = require('../models/subscriberModel')
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/auth');
const validateMongodbId = require('../utils/validateMongodbid');
const {generateRefreshToken} = require('../config/refreshtoken');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./emailController');
const crypto = require('crypto')

const createSubscriber = asyncHandler(async(req, res) =>{
    const email = req.body.email;
    const findSubscriber = await Subscriber.findOne({email})
    if(!findSubscriber){
        //create new Subscriber
        const newSubscriber = Subscriber.create(req.body)
        res.json({newSubscriber});
    } else {
        //Subscriber exists
      throw new Error(`Subscriber Already Exists`)
    }
});

//get all Subscribers
const getAllSubscribers = asyncHandler(async (req, res) => {
    try {
        const getSubscribers = await Subscriber.find();
        res.json(getSubscribers);
    }catch (err) {
        throw new Error(err)
    }
});

//Delete a Subscriber
const deleteSubscriber = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const deleteSubscriber = await Subscriber.findByIdAndDelete(id);
        res.json(deleteSubscriber);
        
    } catch (error) {
        throw new Error(error);
        
    }
});


module.exports = {
    createSubscriber,
    getAllSubscribers,
    deleteSubscriber,
}