import 'dotenv/config';
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import User from "../Schema/User.model.js";
import { nanoid } from "nanoid";
import jwt from 'jsonwebtoken';

class AuthController {
    static async login(req, res){
        try{
            const { email, password } = req.body;

            User.findOne({ "personal_info.email" : email })
            .then((user) => {
                
                if(!user){
                    return res.status(403).json({ "error" : "Email not found"});
                }

                bcrypt.compare( password, user.personal_info.password, (err, result) => {
                    if(err){
                        return res.status(403).json({ "error" : "Error occurred while login, please try again" })
                    }

                    if(!result){
                        return res.status(403).json({ "error" : "Incorrect password !" })
                    }else{
                        return res.status(200).json( AuthController.formatDataToSend(user) );
                    }
                })
            })
            .catch((err) => {
                return res.status(404).json({ "error" : err.message })
            })
        }catch(err){

        }
    }

    static async register(req, res){
        try{
            const {fullname, email, password } = req.body;
            if(!fullname || fullname?.length < 3){
                return res.status(403).json({ "error" : "Fullname must be atleast 3 letters long."});
            }

            if(!email?.length){
                return res.status(403).json({ "error" : "Enter email"});
            }

            const EMAIL_REGEX = new RegExp(process.env.EMAIL_REGEX);
            const PASSWORD_REGEX = new RegExp(process.env.PASSWORD_REGEX);

            if(!EMAIL_REGEX.test(email)){
                return res.status(403).json({ "error" : "Email is invalid"});
            }

            if(!PASSWORD_REGEX.test(password)){
                return res.status(403).json({ "error" : "Password must contain atleast one upper case character, one lower case character, one special character and one number. Password should be 8 to 20 characters long."});
            }

            bcrypt.hash(password, 10, async(err, hashedPass) => {
                let username = await AuthController.generateUserName(email);

                let user = new User({
                    personal_info: { fullname, email, password : hashedPass, username }
                })

                user.save().then(u => {
                    res.status(200).json(AuthController.formatDataToSend(u));
                })
                .catch(err =>  {
                    res.status(500).json({ "error" : err.message });
                })
            })

        }catch(err){
            console.log(err);
        }
    }

    static async generateUserName(email){
        try{
            var username = email.split("@")[0];
            let isUserNameExists = await User.findOne({ "username" : username}).then((result) => result);
            isUserNameExists ? username += nanoid().substring(0,5) : username.length < 3 ? username += nanoid().substring(0,5) : "";
        }catch(err){
            console.log(err.message);
        }
        return username;
    }

    static formatDataToSend(user){
        const access_token = jwt.sign({ id : user._id }, process.env.SECRET_ACCESS_KEY);
        return {
            access_token,
            profile_img : user.personal_info.profile_img,
            email : user.personal_info.email,
            username : user.personal_info.username,
            fullname : user.personal_info.fullname
        }
    }
    
}

export default AuthController;
