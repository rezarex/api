const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/auth');
const validateMongodbId = require('../utils/validateMongodbid');
const {generateRefreshToken} = require('../config/refreshToken');
const jwt = require('jsonwebtoken')


const createUser = asyncHandler(async(req, res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email})
    if(!findUser){
        //create new user
        const newUser = User.create(req.body)
        res.json({newUser});
    } else {
        //user exists
      throw new Error(`User Already Exists`)
    }
});

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    //check if user exists
    const findUser = await User.findOne({email})
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findUser?.id);
        const updateuser = await User.findByIdAndUpdate(findUser._id,{
            refreshToken: refreshToken,
        },
         {new: true});
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 72*60*60*1000,
        })
        res.json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser.mobile,
                token: generateToken(findUser?.id)            
            });
    }else {
        throw new Error(`Invalid Credentials`);
    }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async(req, res)=>{
    const cookie = req.cookies
    //console.log(cookie);
    if(!cookie?.refreshToken) throw new Error(`No refresh token in Cookies`)
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({"refreshToken":refreshToken})
    if(!user) throw new Error(`No refresh token present in DB or not nmatched.`)
    ///res.json(user);
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded)=>{
        if(err || user.id !== decoded.id) throw new Error(`There is something wrong with refresh token`)
        const accessToken = generateToken(user?.id)
        res.json({accessToken})
    })
})

//logout function
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error(`No refresh token in Cookies`)
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({"refreshToken":refreshToken})
    if(!user){
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
    });
    return res.sendStatus(204)///forbidden
        
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken: "",
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
});
res.sendStatus(204)///forbidden
    //res.json({message: `Logged out successfully`});
});


//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    }catch (err) {
        throw new Error(err)
    }
});

//get single user
const getSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const getUser = await User.findById(id);
        res.json(getUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongodbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(_id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true
        });
        res.json(updateUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

const blockUser = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true
        },{
            
            new: true
        }
        );
        res.json({
            message: "User is blocked"
        })
    } catch (error) {
        throw new Error(error);
    }
});
 const unblockUser = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false
        },{
            new: true
        }
        );
        res.json({
            message: "User is Unblocked"
        })
    } catch (error) {
        throw new Error(error);
    }
 });

module.exports = {
    handleRefreshToken,
    createUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    logout,
}
