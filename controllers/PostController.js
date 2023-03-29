const Post = require('../models/PostModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')



const createPost = asyncHandler(async (req,res)=>{
   try {
    if(req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const newPost = await Post.create(req.body)
    res.json(newPost)
   } catch (error) {
    throw new Error(error)
   }
})

const getPost = asyncHandler(async(req, res)=>{
    const {id} = req.params 
    try {
        const findPost = await Post.findById(id)
        res.json(findPost)
    } catch (error) {
        throw new Error(error)   
    }
})

const getAllPosts = asyncHandler(async(req, res)=>{
    try {

        //Filtering
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach((el) => delete queryObj[el]) 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)

        let query = Post.find(JSON.parse(queryStr));
        
        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        //limiting fields
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else{
            query = query.select('-__v')
        }

        //pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const postCount = await Post.countDocuments();
            if(skip >= postCount) throw new Error("The page does not exist!")
        }
        
        const post = await query
        //const allPosts = await Post.find(queryObj)
        res.json(post)
    } catch (error) {
        throw new Error(error)
    }
})

const updatePost = asyncHandler(async(req, res)=>{
    const { id } = req.params
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }

        const updatePost = await Post.findOneAndUpdate(id, req.body, {
            new: true
        })

        res.json(updatePost)
        
    } catch (error) {
        throw new Error(error)
    }
})


///TODO: delete keeps deleting regardless of the ID, check on that

const deletePost = asyncHandler(async(req, res)=>{
    const { id } = req.params
    try {
       
        const deletePost = await Post.findOneAndDelete(id)

        res.json(deletePost)
        
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {createPost, getPost, getAllPosts, updatePost, deletePost}