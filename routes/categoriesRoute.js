const express = require("express");
const { createCategory, updateCategory, deleteCategory, getACategory, getCategory } = require("../controllers/categoryctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router()


router.post('/add', authMiddleware, isAdmin, createCategory)
router.put('/edit/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/:id', authMiddleware, isAdmin, getACategory)
router.get('/', authMiddleware, isAdmin, getCategory)

module.exports = router;