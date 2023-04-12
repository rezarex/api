const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../utils/validateMongodbid');
const Skill = require('../models/Skill');

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

const rating = asyncHandler(async (req, res)=>{
    const {_id} = req.user;
    const {star, comment, skillId} = req.body;
   
    try {
        const skill = await Skill.findById(skillId);
        let alreadyRated = skill.ratings.find(
        (userId)=>userId.postedby.toString()===_id.toString()
        );
        if(alreadyRated){
            const updateRating = await Skill.updateOne(
                {
                ratings: { $elemMatch: alreadyRated },
            },
            {
                $set: {"ratings.$.star":star, "ratings.$.comment":comment}
            },
            {
                new: true,
            }
            
            );
            res.json("Done!")
        } else {

               const rateSkill = await Skill.findByIdAndUpdate(
                   skillId,
                     {
                     $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id
        
                    
                    },
                },
            },
        {
            new: true
        }    
        );
        res.json(rateSkill)
        }
    } catch (error) {
        throw new Error(error)
    }
});

const uploadImages = asyncHandler(async(req, res)=>{
    const { id } = req.params
    validateMongodbId(id)
    try {
        /**
         * disabled cloudinary coz it has issues and I dont really need it at the moment...
         */
        //const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = []
        const files = req.files;
        //console.log(req.files);
        for (const file of files){
            const {path} = file;
            console.log(path)
            //const newpath = await uploader(path)
           // console.log(newpath);
            urls.push(path)
        }
        const findSkill = await Skill.findByIdAndUpdate(id,{
            images: urls.map((file)=>{
                return file;
            }),
         },
         {
            new: true,
        }
         );
         res.json(findSkill)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createSkill, updateSkill, deleteSkill, getASkill, getSkill, rating, uploadImages}
