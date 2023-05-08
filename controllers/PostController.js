const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbId = require("../utils/validateMongodbid")
const cloudinaryUploadImg = require('../utils/cloudinary')
const fs = require("fs")



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
    validateMongodbId(id)
    try {
        const findPost = await Post.findById(id).populate('likes');
        await Post.findByIdAndUpdate(id, {
            $inc: {numViews: 1}
        },
        {
            new: true
        })
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
    validateMongodbId(id)
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
    validateMongodbId(id)
    try {
       
        const deletePost = await Post.findOneAndDelete(id)

        res.json(deletePost)
        
    } catch (error) {
        throw new Error(error)
    }
});

const likeBlog = asyncHandler(async (req, res)=>{
    const { postId } = req.body;
     validateMongodbId(postId)
    //find the post to like
    const post = await Post.findById(postId)
    //find logged in user
    const loginUserId = req?.user?._id

    //check if user has liked the post
    const isLiked = post?.isLiked

    //check if user disliked the post
    const alreadyDisliked = post?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

        if(alreadyDisliked){
            const post = await Post.findByIdAndUpdate(postId, {
                $pull: { dislikes: loginUserId},
                isDisLiked: false
            },
            {
                new: true
            });
            res.json(post)
        }

        if(isLiked){
            const post = await Post.findByIdAndUpdate(postId, {
                $pull: { likes: loginUserId},
                isLiked: false
            },
            {
                new: true
            });
            res.json(post)
        }
        else {
            const post = await Post.findByIdAndUpdate(postId, {
                $push: { likes: loginUserId},
                isLiked: true
            },
            {
                new: true
            });
            res.json(post)
        }
    
});


const dislikeBlog = asyncHandler(async (req, res)=>{
    const { postId } = req.body;
     validateMongodbId(postId)
    //find the post to like
    const post = await Post.findById(postId)
    //find logged in user
    const loginUserId = req?.user?._id

    //check if user has liked the post
    const isDisLiked = post?.isDisLiked

    //check if user disliked the post
    const alreadyLiked = post?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

        if(alreadyLiked){
            const post = await Post.findByIdAndUpdate(postId, {
                $pull: { likes: loginUserId},
                isLiked: false
            },
            {
                new: true
            });
            res.json(post)
        }

        if(isDisLiked){
            const post = await Post.findByIdAndUpdate(postId, {
                $pull: { dislikes: loginUserId},
                isDisLiked: false
            },
            {
                new: true
            });
            res.json(post)
        }
        else {
            const post = await Post.findByIdAndUpdate(postId, {
                $push: { dislikes: loginUserId},
                isDisLiked: true
            },
            {
                new: true
            });
            res.json(post)
        }
    
});



module.exports = {createPost, getPost, getAllPosts, updatePost, deletePost, likeBlog, dislikeBlog}