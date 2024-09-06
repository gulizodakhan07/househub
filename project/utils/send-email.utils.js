import nodemailer from 'nodemailer'
import { config } from "dotenv"
config()
export const sendEmail = async (to,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAI_PORT,
            secure: false,
            auth:{
                user: process.env.FROM_MAIL_USER,
                password: process.env.MAIL_PASSWORD
            }
        })
        const options = {
            from: process.env.FROM_MAIL_USER,
            to: to,
            subject: subject,
            text: text
        }
        const data = await transporter.sendMail(options)
        return {success: true, info: data}
        

    }catch(err){
        return {success: false,error: err}

    }
}