const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin} = require('../controllers/UserController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { profileImgResize, uploadPhoto } = require('../middlewares/uploadImg');
const router = express.Router()

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.post('/login', loginUser);
router.post('/login/admin', loginAdmin);
router.get('/allusers', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout',logout)
router.get('/:id', authMiddleware, isAdmin, getSingleUser);
router.delete('/:id', deleteUser);
router.put('/editUser/:id', authMiddleware, isAdmin, updateUser);
router.put('/blockUser/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblockUser/:id', authMiddleware, isAdmin, unblockUser);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images',10), profileImgResize)
router.put('/password', authMiddleware, updatePassword);





module.exports = router;