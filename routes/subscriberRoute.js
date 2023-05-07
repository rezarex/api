const express = require("express");
const {  createSubscriber, getAllSubscribers,deleteSubscriber, } = require("../controllers/subscriberController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router()


router.post('/add',createSubscriber)
router.delete('/delete/:id', authMiddleware, deleteSubscriber)
//router.get('/:id', getASubscriber) //add feature when needed
router.get('/', getAllSubscribers)

module.exports = router;