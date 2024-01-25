const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbId = require("../utils/validateMongodbid")
const cloudinaryUploadImg = require('../utils/cloudinary')
const fs = require("fs")

const stkPush = asyncHandler(async (req,res)=>{
//     const getAccessToken = () => {

//         const consumerKey = "s9wDG7BA1oq2G4GCsKADKT2gO4rbAGxp"
//         const consumerSecret = "dFAehAajfSZxhGOn"
    
//         //choose one depending on you development environment
//         //const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",  //sandbox
//         const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",  //live
        
//       try {
       
//         const encodedCredentials = new Buffer.from(consumerKey + ":" + consumerSecret).toString('base64');
    
//         const headers = {
//           'Authorization': "Basic" + " " + encodedCredentials',
//           'Content-Type': 'application/json'
//         }; 
    
//         const response = await axios.get(url, { headers });
//         return response.data.access_token;
//       } catch (error) {
        
//         throw new Error('Failed to get access token.');
//       }
//     }
 })

 const stkCallback = asyncHandler(async (req,res)=>{
    try {
        const callbackData = req.body;

        // Log the callback data to the console
        console.log(callbackData);
      
        // Send a response back to the M-Pesa
        res.json({ status: 'success' });
    } catch (error) {
     throw new Error(error)
    }
 })


 module.exports = { stkPush, stkCallback}