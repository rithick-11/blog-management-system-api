const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config()

const fromMail = process.env.FROM_MAIL

const baseUrl = process.env.DEV === "developmen" ? "http://localhost:5002" : "https://blog-management-system-api.vercel.app"


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: fromMail,
    port: 465,
    secure: true,
    auth:{
        user: fromMail,
        pass : process.env.MAIL_PASS
    }
})

const sentToken = async (email, token) => {
    try{
        await transporter.sendMail({
            from:fromMail,
            to: email,
            subject:"blog verification link",
            html: `verify your e-mail <a href="${baseUrl}/api/auth/verify/${token}">click here </a>`
        })
        return true
    }catch(err){
        console.log(err, fromMail);
        return false
    }

}

module.exports = {sentToken}