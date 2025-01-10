const jwt = require("jsonwebtoken")
const {jwt_Password} = require("./password")

function authMiddleWare(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer' )){
        return res.status(403).json({
            error:"Token Missing"
        })
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,jwt_Password);
        req.userId = decoded._id;
        next();
    }catch{
        return res.status(403).json({})
    }
}

module.exports={
    authMiddleWare
}