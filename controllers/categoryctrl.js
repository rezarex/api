const Category = require('../models/CategoryModel')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../utils/validateMongodbid')

const createCategory = asyncHandler(async (req, res)=>{
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error)
    }
})



const deleteCategory = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error)
    }
})


const getACategory = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const getaCategory = await Category.findById(id);
        res.json(getaCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const getCategory = asyncHandler(async (req, res)=>{
    try {
        const getAll = await Category.find();
        res.json(getAll);
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createCategory, updateCategory, deleteCategory, getACategory, getCategory}
