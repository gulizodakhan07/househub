import nodemailer from 'nodemailer'
import { config } from "dotenv"
config()
export const sendEmail = async (options)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth:{
                user: process.env.FROM_MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
        const data = await transporter.sendMail(options)
        return {success: true, info: data}
        

    }catch(err){
        console.log(err)
        return {success: false,error: err}
    }
}