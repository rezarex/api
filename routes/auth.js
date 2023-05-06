const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin} = require('../controllers/UserController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { profileImgResize, uploadPhoto } = require('../middlewares/uploadImg');
const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: this is used for user registration
 *      responses:
 *       200:
 *         description: Registration of users
 */
router.post('/register', createUser);
/**
 * @swagger
 * /api/auth/forgot-password-token:
 *  post:
 *      summary: this is used when user forgot their password
 *      responses:
 *       200:
 *         description: Forgot password
 */
router.post('/forgot-password-token', forgotPasswordToken)
/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *  put:
 *      summary: this is used for reseting a user's password token
 *      parameters:
 *       - name: token
 *         in: path
 *         description: token used for reseting password
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *       200:
 *         description: Reseting the password token
 */
router.put('/reset-password/:token', resetPassword)
router.post('/login', loginUser);
/**
 * @swagger
 * /api/auth/login/admin:
 *  post:
 *      summary: this is used to login admin user
 *      responses:
 *       200:
 *         description: Registration of users
 */
router.post('/login/admin', loginAdmin);
/**
 * @swagger
 * /api/auth/allusers:
 *   get:
 *     summary: Returns a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */
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