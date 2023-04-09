const express = require("express");
const { createSkill, updateSkill, deleteSkill, getASkill, getSkill } = require("../controllers/skilCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router()


router.post('/add', authMiddleware, isAdmin, createSkill)
router.put('/edit/:id', authMiddleware, isAdmin, updateSkill)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteSkill)
router.get('/:id', authMiddleware, isAdmin, getASkill)
router.get('/', authMiddleware, isAdmin, getSkill)

module.exports = router;