import mongoose, { Schema } from "mongoose"
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please Provide Username"],
        unique:[true,"username shloud be unique"],


    },
    email:{
        type:String,
        required:[true,"Please Provide email"],
        unique:[true,"email shloud be unique"],
        

    },
    password:{
        type:String,
        required:[true,"Please Provide password"],
    },
    isVerified:{
        type:Boolean,
        default:false
        
    },
    isAdmin:{
        type:Boolean,
        default:false
        
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

},{timestamps:true})

const User=mongoose.models.users|| mongoose.model("users",userSchema)

export default User