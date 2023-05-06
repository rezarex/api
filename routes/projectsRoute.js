const express = require("express");
//const { createProject, updateSkill, deleteSkill, getASkill, getSkill, rating } = require("../controllers/skilCtrl");
const {createProject, getProject, getAllProjects, updateProject,uploadImages, deleteProject, likeProject, dislikeProject} = require('../controllers/projectCtrl')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize, skillImgResize } = require("../middlewares/uploadImg");
const router = express.Router()


router.post('/add', authMiddleware, isAdmin, createProject)
router.put('/edit/:id', authMiddleware, isAdmin, updateProject)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images',10), blogImgResize)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteProject)
router.get('/:id', getProject)
router.get('/', getAllProjects)


module.exports = router;