const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {userSignInSchema , updateSchema , userLoginSchema} = require("../zod")
const {authMiddleWare} = require("../middleware");
const {User,Account} = require("../DataBase");
const jwt = require("jsonwebtoken")
const {jwt_Password} = require("../password")
router.use(express.json());

router.get("/balance",authMiddleWare,async(req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })
    res.json({
        balance:account.balance
    })
})

router.put("/transfer",authMiddleWare,async(req,res)=>{
    const session = await mongoose.startSession(); //Starting a session

    session.startTransaction(); //Everything inside a session will be executed together(Not stop partially)
    const {amount,to} = req.body;

    const account = await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(403).json({
            message:"Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(403).json({
            message:"Invalid Account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    //Commit the transaction
    await session.commitTransaction(); //Till here

    const user = await Account.findOne({userId:req.userId});
    res.json({
        message: "Transaction Successful",
        balance: user.balance
    })
})

module.exports = router;