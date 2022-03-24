import express from "express";
const router = express.Router();
import UserModal from "../models/user.js";
import randomstring from 'randomstring';
import bcrypt from "bcryptjs";
//import mailer from "../misc/mailer";
import { signin, signup } from "../controllers/user.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const MAILGUN_USER= process.env.MAILGUN_USER;

const MAILGUN_PASS= process.env.MAILGUN_PASS;

const transport = nodemailer.createTransport({
    service: 'Mailjet',
    auth: {
      user: MAILGUN_USER,
      pass: MAILGUN_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

 const sendEmail=(from, to, subject, html)=>{
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  };

router.post("/signin", signin);
router.post("/signup", signup);

router.put("/forgot",async (req, res,next)=>{

    try{
        console.log(req.body.email)
        const result = req.body.email;
        const user = await UserModal.findOne({email:result.email});
        if(!user)
        {
            res.json({error:'User not found'})
        }
        else{
            const newToken = randomstring.generate();
            const secretToken = newToken.slice(0,6);
            const hashedPassword = await bcrypt.hash(result.password, 12);
           
            const updatedUser =await UserModal.updateOne({email:result.email},{$set:{password:hashedPassword,token:secretToken}})
            console.log(updatedUser)
            const html = `Hi there,
            <br/>
            
            <br/><br/>
            Please verify your email by typing the following token:
            <br/>
            Token: <b>${secretToken}</b>
            <br/>
            On the following page:
            <a href="https://flashback-client2022.netlify.app/user/verify">https://flashback-client2022.netlify.app/user/verify</a>
            <br/><br/>
            Have a pleasant day.` 

            // Send email
            await sendEmail('flashback908251@gmail.com', result.email, 'Please verify your email!', html);

            res.json({success:'Please Check your email',updatedUser})
        }
    
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }

})

router.put('/verify',async (req,res,next)=>{
  try{
    const result = req.body.email;
    console.log(req)
    const user = await UserModal.findOne({email:result.email,token:result.token});
    if(!user){
      const updatedUser =await UserModal.updateOne({email:result.email,token:result.token},{token:null})
      res.json({success:'Account updated',updatedUser})
    }
    else{
      res.json({error:'Sorry No token found'})
    }
  }
  catch(error)
  {
    console.log(error)
    next(error)
  }
})

export default router;