const express = require("express");
const { createNewsletter, updateNewsletter, deleteNewsletter, getANewsletter, getNewsletter } = require("../controllers/newsletter");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router()


router.post('/add', authMiddleware, isAdmin, createNewsletter)
router.put('/edit/:id', authMiddleware, isAdmin, updateNewsletter)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteNewsletter)
router.get('/:id', authMiddleware, isAdmin, getANewsletter)
router.get('/', authMiddleware, isAdmin, getNewsletter)

module.exports = router;