const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Vilay123:Hungryvilay@cluster0.nfg6fbr.mongodb.net/Paytm");

const UserSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    }
})

const AccountSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
    balance: {
        type:Number,
        required:true
    }
})
const User = mongoose.model("Users",UserSchema);
const Account =  mongoose.model("Accounts",AccountSchema);

module.exports = {
    User , Account
}