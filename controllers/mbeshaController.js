const asyncHandler = require('express-async-handler')
// const slugify = require('slugify')
// const validateMongodbId = require("../utils/validateMongodbid")
// const cloudinaryUploadImg = require('../utils/cloudinary')
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

        // Check the result code
        const result_code = callbackData.Body.stkCallback.ResultCode;
        if (result_code !== 0) {
          // If the result code is not 0, there was an error
          const error_message = callbackData.Body.stkCallback.ResultDesc;
          const response_data = { ResultCode: result_code, ResultDesc: error_message };
          return res.json(response_data);
        }
      
        // If the result code is 0, the transaction was completed
        const body = req.body.Body.stkCallback.CallbackMetadata;
      
        // Get amount
        const amountObj = body.Item.find(obj => obj.Name === 'Amount');
        const amount = amountObj.Value
      
        // Get Mpesa code
        const codeObj = body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');
        const mpesaCode = codeObj.Value 
      
        // Get phone number
        const phoneNumberObj = body.Item.find(obj => obj.Name === 'PhoneNumber');
        const phone = phoneNumberObj.Value
      
        // Save the variables to a file or database, etc.
        // ...
        fs.writeFileSync('/tmp/test-sync', `the amount paid is ${amount} and it was paid by ${phone}`);
      
        // Return a success response to mpesa
        return res.json("success");
    } catch (error) {
     throw new Error(error)
    }
 })


 module.exports = { stkCallback}