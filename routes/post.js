const express = require('express');
const { createPost } = require('../controllers/PostController');
const router = express.Router()

router.post("/", createPost)





module.exports = router;