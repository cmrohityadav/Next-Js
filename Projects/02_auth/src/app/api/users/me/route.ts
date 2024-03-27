import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js"
import {NextRequest,NextResponse} from 'next/server'

import { getDataFromToken } from "@/helper/getDataFromToken";


connect()

export  async function POST(request:NextRequest){
    try {
        // extract data from token
        const userId=await getDataFromToken(request)
       const user=await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})
        }
    
        
        return NextResponse.json({
            message:"User Data Found",
            data:user,
            success:true,
        })
    } catch (error) {
        return NextResponse.json({error:"Invalid login try to login"},{status:400})
    }

}