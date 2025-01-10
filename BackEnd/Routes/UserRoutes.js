const express = require("express");
const router = express.Router();
const {userSignInSchema , updateSchema , userLoginSchema} = require("../zod")
const {authMiddleWare} = require("../middleware");
const {User,Account} = require("../DataBase");
const jwt = require("jsonwebtoken")
const {jwt_Password} = require("../password")
router.use(express.json());

//Generating a token while signup as well as signin
router.post("/signup",async (req,res)=>{
    const inputBody = req.body;

    //Input Validation
    const response = userSignInSchema.safeParse(inputBody);
    if(!response.success){
        return res.status(400).json({
            error:"Invalid Inputs"
        })
    }

    //Checking for existence
    const existingUser = await User.findOne({username:inputBody.username});
    if(existingUser){
        res.status(409).json({
            error:"Username already taken"
        })
    }else{  //Creating a new user
        const user = await User.create(inputBody)
        const userId = user._id;
        const account=await Account.create({
            userId,
            balance: 1 + Math.random() * 10000 //Generating a random balance for everyone upon signing up
        }) 
        const token = jwt.sign({_id:userId},jwt_Password);
        return res.json({
            msg:"User created successfully",
            token:token,
            balance:account.balance
        })
    }
})

router.post("/login",async(req,res)=>{
    const body = req.body;
    const result = userLoginSchema.safeParse(body)
    if(!result.success){
        return res.status(400).json({
            error:"Incorrect Credentials"
        })
    }
    const user = await User.findOne({username:body.username});
    if(!user || user.password!=body.password){
        return res.status(403).json({
            error:"Username or password incorrect"
        })
    }else{
        const account = await Account.findOne({ userId: user._id });
        const token = jwt.sign({_id:user._id},jwt_Password);
        return res.json({
            msg:"Successfully Logged In",
            token,
            balance:account.balance
        })
    }
})

router.put("/update",authMiddleWare,async (req,res)=>{
    const updates = req.body;
    const response = updateSchema.safeParse(updates);
    if(!response.success){
        return res.status(403).json({})
    }
    try{
        await User.updateOne({
            _id: req.userId
        },{
            $set: updates
        });
        res.json({
            msg: "Updated Succesfully"
        })
    }catch{
        res.status(403).json({
            error: "Couldn't Update your information"
        })
    }   
})

router.get("/bulk",authMiddleWare,async (req,res)=>{
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    
    //To exclude the current user
    const filteredUsers = users.filter(user => user._id.toString() != req.userId);
    
    res.json({
        Users: filteredUsers.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id : user._id
        }))
    })
})

module.exports = router