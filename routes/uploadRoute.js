const express = require('express');
const { uploadImages } = require('../controllers/uploadCtrl');
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImg');


router.put('/:id', authMiddleware, isAdmin, uploadPhoto.array('images',2), blogImgResize, uploadImages)







module.exports = router;