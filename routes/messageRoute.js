const express = require("express");
const { createMessage, updateMessage, deleteMessage, getAMessage, getMessage } = require("../controllers/messageCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router()


router.post('/add', createMessage)
router.put('/edit/:id', authMiddleware, isAdmin, updateMessage)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteMessage)
router.get('/:id', authMiddleware, isAdmin, getAMessage)
router.get('/', getMessage)

module.exports = router;