const Newsletter = require('../models/NewsletterModel')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../utils/validateMongodbid')

const createNewsletter = asyncHandler(async (req, res)=>{
    try {
        const newNewsletter = await Newsletter.create(req.body);
        res.json(newNewsletter);
    } catch (error) {
        throw new Error(error)
    }
})

const updateNewsletter = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const updatedNewsletter = await Newsletter.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.json(updatedNewsletter);
    } catch (error) {
        throw new Error(error)
    }
})



const deleteNewsletter = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const deletedNewsletter = await Newsletter.findByIdAndDelete(id);
        res.json(deletedNewsletter);
    } catch (error) {
        throw new Error(error)
    }
})


const getANewsletter = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const getaNewsletter = await Newsletter.findById(id);
        res.json(getaNewsletter);
    } catch (error) {
        throw new Error(error)
    }
})

const getNewsletter = asyncHandler(async (req, res)=>{
    try {
        const getAll = await Newsletter.find();
        res.json(getAll);
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createNewsletter, updateNewsletter, deleteNewsletter, getANewsletter, getNewsletter}
