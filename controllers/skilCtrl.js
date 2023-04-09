const Newsletter = require('../models/NewsletterModel')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../utils/validateMongodbid')

const createSkill = asyncHandler(async (req, res)=>{
    try {
        const newSkill = await Skill.create(req.body);
        res.json(newSkill);
    } catch (error) {
        throw new Error(error)
    }
})

const updateSkill = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.json(updatedSkill);
    } catch (error) {
        throw new Error(error)
    }
})



const deleteSkill = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const deletedSkill = await Skill.findByIdAndDelete(id);
        res.json(deletedSkill);
    } catch (error) {
        throw new Error(error)
    }
})


const getASkill = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const getaSkill = await Skill.findById(id);
        res.json(getaSkill);
    } catch (error) {
        throw new Error(error)
    }
})

const getSkill = asyncHandler(async (req, res)=>{
    try {
        const getAll = await Skill.find();
        res.json(getAll);
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createSkill, updateSkill, deleteSkill, getASkill, getSkill}
