const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");
const Post = require('../models/PostModel')


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
            fs.unlinkSync(path)
        }
        // const images = urls.map((file)=>{
        //     return file;
        // })
        // res.json(images)
        const findPost = await Post.findByIdAndUpdate(id,{
            photo: urls.map((file)=>{
                return file;
            }),
         },
         {
            new: true,
        }
         );
         res.json(findPost)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    uploadImages,
}