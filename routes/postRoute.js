const express = require('express');
const { createPost, getPost, getAllPosts, updatePost, deletePost } = require('../controllers/PostController');
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')

router.get("/", getAllPosts)
router.post("/create", authMiddleware, isAdmin,  createPost)
router.get("/:id", getPost)
router.put("/:id", authMiddleware, isAdmin,  updatePost)
router.delete("/:id", authMiddleware, isAdmin,  deletePost)





module.exports = router;