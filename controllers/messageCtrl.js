const Message = require('../models/messageModel')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../utils/validateMongodbid')

const createMessage = asyncHandler(async (req, res)=>{
    try {
        const newMessage = await Message.create(req.body);
        res.json(newMessage);
    } catch (error) {
        throw new Error(error)
    }
})

const updateMessage = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const updatedMessage = await Message.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.json(updatedMessage);
    } catch (error) {
        throw new Error(error)
    }
})



const deleteMessage = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        res.json(deletedMessage);
    } catch (error) {
        throw new Error(error)
    }
})


const getAMessage = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const getaMessage = await Message.findById(id);
        res.json(getaMessage);
    } catch (error) {
        throw new Error(error)
    }
})

const getMessage = asyncHandler(async (req, res)=>{
    try {
        const getAll = await Message.find();
        res.json(getAll);
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createMessage, updateMessage, deleteMessage, getAMessage, getMessage}
