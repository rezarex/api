const express = require('express');
const { createProject, getProject, getAllProjects, updateProject, deleteProject, likeProject, dislikeProject } = require('../controllers/projectCtrl');
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')

router.get("/", getAllProjects)
router.post("/create", authMiddleware, isAdmin,  createProject)
router.put("/likes", authMiddleware,likeProject)
router.put("/dislikes", authMiddleware,dislikeProject)
router.get("/:id", getProject)
router.put("/:id", authMiddleware, isAdmin,  updateProject)
router.delete("/:id", authMiddleware, isAdmin,  deleteProject)






module.exports = router;