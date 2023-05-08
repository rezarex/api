const express = require('express');
const { createPost, getPost, getAllPosts, updatePost, deletePost, likeBlog, dislikeBlog } = require('../controllers/PostController');
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImg');

router.get("/", getAllPosts)
router.post("/create", authMiddleware, isAdmin,  createPost)
router.put("/likes", authMiddleware,likeBlog)
router.put("/dislikes", authMiddleware,dislikeBlog)
router.get("/:id", getPost)
router.put("/:id", authMiddleware, isAdmin,  updatePost)
router.delete("/:id", authMiddleware, isAdmin,  deletePost)






module.exports = router;