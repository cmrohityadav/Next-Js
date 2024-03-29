import User from "@/models/user.model.js";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'
export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
      const hashedToken=await bcryptjs.hash(userId.toString(),10)

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
              $set:{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            }})
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
              $set:{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            }})
        }
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io", /* leter move it to .env */
            port: 2525,  /* leter move it to .env */
            auth: {
              user: "05fc5c45e06bb8", /* leter move it to .env */
              pass: "4a566125672885" /* leter move it to .env */
            }
          });

          const mailOptions={
            from: 'Admin@cmrohityadav.in', // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY'? "Verify your email":"Reset your Password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here </a> to ${emailType==='VERIFY'? "Verify your email":"Reset your Password"} or copy and paste the link below in your browser
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`, // i have to also design for Reset , so create a variable above and condition
          }

          const mailResponse=await transporter.sendMail(mailOptions)
          return mailResponse


    } catch (error:any) {
        throw new Error(error.message)

        
    }
}
