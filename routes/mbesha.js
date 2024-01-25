const express = require('express');
const { stkPush, stkCallback } = require('../controllers/mbeshaController');
const router = express.Router()
// const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
// const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImg');

//router.post("/stk", stkPush);
router.post("/callback", stkCallback)

module.exports = router;