import mongoose , {Schema,Document}from "mongoose";

export interface Message extends Document{
    content: string,
    createdAt:Date,

}

const MessageSchema:Schema<Message>=new Schema({
content:{
    type:String,
    required:true,

},
createdAt:{
    type:Date,
    required:true
}
})


export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    message:Message[],
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim: true,
        unique:true

    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim: true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ,"please use a valid email"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verify code is required"],

    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code expiray is required"],


    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[MessageSchema],




})


const UserModel=(mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel