const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout} = require('../controllers/UserController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/allusers', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout',logout)
router.get('/:id', authMiddleware, isAdmin, getSingleUser);
router.delete('/:id', deleteUser);
router.put('/editUser/:id', authMiddleware, isAdmin, updateUser);
router.put('/blockUser/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblockUser/:id', authMiddleware, isAdmin, unblockUser);





module.exports = router;