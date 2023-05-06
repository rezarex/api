const express = require("express");
const { createSkill, updateSkill, deleteSkill, getASkill, getSkill, rating } = require("../controllers/skilCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize, skillImgResize } = require("../middlewares/uploadImg");
const router = express.Router()


router.post('/add', authMiddleware, isAdmin, createSkill)
router.put('/edit/:id', authMiddleware, isAdmin, updateSkill)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images',10), skillImgResize)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteSkill)
router.get('/:id', getASkill)
router.get('/', getSkill)
router.put('/rating', authMiddleware, isAdmin, rating)

module.exports = router;