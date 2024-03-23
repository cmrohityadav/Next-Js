import mongoose from "mongoose"

export async function connect(){
    try {
        
        mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDb Connected")
            process.exit(1)
        })

        connection.on("error",(err)=>{
            console.log("mongoDB connection error pls make sure db is up and running"+ err)
        })
    } catch (error) {
        console.log("Something Went wrong in connection to DB")
        console.log(error)
    }
}