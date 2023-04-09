const Project = require('../models/Projects')
const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbId = require("../utils/validateMongodbid")



const createProject = asyncHandler(async (req,res)=>{
   try {
    if(req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const newProject = await Project.create(req.body)
    res.json(newProject)
   } catch (error) {
    throw new Error(error)
   }
})

const getProject = asyncHandler(async(req, res)=>{
    const {id} = req.params 
    validateMongodbId(id)
    try {
        const findProject = await Project.findById(id).populate('likes');
        await Project.findByIdAndUpdate(id, {
            $inc: {numViews: 1}
        },
        {
            new: true
        })
        res.json(findProject)
    } catch (error) {
        throw new Error(error)   
    }
})

const getAllProjects = asyncHandler(async(req, res)=>{
    try {

        //Filtering
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach((el) => delete queryObj[el]) 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)

        let query = Project.find(JSON.parse(queryStr));
        
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
            const projectCount = await Project.countDocuments();
            if(skip >= projectCount) throw new Error("The page does not exist!")
        }
        
        const project = await query
        //const allProjects = await Post.find(queryObj)
        res.json(project)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProject = asyncHandler(async(req, res)=>{
    const { id } = req.params
    validateMongodbId(id)
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }

        const updateProject = await Project.findOneAndUpdate(id, req.body, {
            new: true
        })

        res.json(updateProject)
        
    } catch (error) {
        throw new Error(error)
    }
})


///TODO: delete keeps deleting regardless of the ID, check on that

const deleteProject = asyncHandler(async(req, res)=>{
    const { id } = req.params
    validateMongodbId(id)
    try {
       
        const deleteProject = await Project.findOneAndDelete(id)

        res.json(deleteProject)
        
    } catch (error) {
        throw new Error(error)
    }
});

const likeProject = asyncHandler(async (req, res)=>{
    const { projectId } = req.body;
     validateMongodbId(projectId)
    //find the project to like
    const project = await Project.findById(projectId)
    //find logged in user
    const loginUserId = req?.user?._id

    //check if user has liked the post
    const isLiked = project?.isLiked

    //check if user disliked the project
    const alreadyDisliked = project?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

        if(alreadyDisliked){
            const project = await Project.findByIdAndUpdate(projectId, {
                $pull: { dislikes: loginUserId},
                isDisLiked: false
            },
            {
                new: true
            });
            res.json(project)
        }

        if(isLiked){
            const project = await Project.findByIdAndUpdate(projectId, {
                $pull: { likes: loginUserId},
                isLiked: false
            },
            {
                new: true
            });
            res.json(project)
        }
        else {
            const project = await Project.findByIdAndUpdate(projectId, {
                $push: { likes: loginUserId},
                isLiked: true
            },
            {
                new: true
            });
            res.json(project)
        }
    
});


const dislikeProject = asyncHandler(async (req, res)=>{
    const { projectId } = req.body;
     validateMongodbId(projectId)
    //find the project to like
    const project = await Project.findById(projectId)
    //find logged in user
    const loginUserId = req?.user?._id

    //check if user has liked the post
    const isDisLiked = project?.isDisLiked

    //check if user disliked the project
    const alreadyLiked = project?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

        if(alreadyLiked){
            const project = await Project.findByIdAndUpdate(projectId, {
                $pull: { likes: loginUserId},
                isLiked: false
            },
            {
                new: true
            });
            res.json(project)
        }

        if(isDisLiked){
            const project = await Project.findByIdAndUpdate(projectId, {
                $pull: { dislikes: loginUserId},
                isDisLiked: false
            },
            {
                new: true
            });
            res.json(project)
        }
        else {
            const project = await Project.findByIdAndUpdate(projectId, {
                $push: { dislikes: loginUserId},
                isDisLiked: true
            },
            {
                new: true
            });
            res.json(project)
        }
    
});


module.exports = {createProject, getProject, getAllProjects, updateProject, deleteProject, likeProject, dislikeProject}