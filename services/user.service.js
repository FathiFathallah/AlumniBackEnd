const { userModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../email/user.email');

//Sign Up To Alumni
module.exports.signUp = async (req,res)=>{

    const {   firstName,
        lastName,
        birthDate,
        emailAddress,
        country,
        phoneNumber,
        studyField,
        studyState,
        userName,
        password
    } = req.body;
    const userEmail = await userModel.findOne({emailAddress});
    const userPhone = await userModel.findOne({phoneNumber});
    if(userEmail){
        res.json({message:'email already exists'})
    }
    else if(userPhone){
        res.json({message:'phone already exists'})       
    }
    else{
        bcrypt.hash(password, 4, async (err, hash)=>{
            await userModel.insertMany({ firstName,
                lastName,
                birthDate,
                emailAddress,
                country,
                phoneNumber,
                studyField,
                studyState,
                userName,
                password:hash });
            let token = jwt.sign({emailAddress,firstName,lastName,phoneNumber}, "AlumniVerifyEmail___");
            sendEmail({emailAddress, token});
            res.json({message:`success`});
        });

    }
};

//Verify Alumni Account
module.exports.emailVerify = async (req, res)=>{
    let { token } = req.params;
    console.log(token);
    jwt.verify(token, "AlumniVerifyEmail___", async (err,decoded)=>{
        if(err){
            res.json(err);
        }
        else{
            let emailAddress = decoded.emailAddress;
            let user = await userModel.findOne({emailAddress});
            if(user){
                await userModel.findOneAndUpdate({emailAddress},{emailConfirm:true});
                res.json({message:"email verified"});
            }
            else{
                res.json({message:"user not found"});
            }
        }
    });
};

//LogIn Alumni Account
module.exports.logIn = async (req,res)=>{
    const { emailAddress, password } = req.body;
    let user = await userModel.findOne({emailAddress});
    if(user){
        const match = await bcrypt.compare(password, user.password)
        if(match){
            //let token = jwt.sign({userId:user._id,name:user.name,emailConfirm:user.emailConfirm},'alumni@nodeJS');
            if(user.isAdmin) 
                res.json({message:'success admin'});
            else if(user.emailConfirm)
                res.json({message:'success user'});
            else res.json({message:'email verification needed'});
        }
        else{
            res.json({message:'password incorrect'});
        }
    }
    else{
        res.json({message:'email does not exists'});
    }
};

//Get Personal Information
module.exports.getPerosnalInfo = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});
    let {
        firstName,
        lastName,
        birthDate,
        country,
        city,
        phoneNumber 
    } = user;
    birthDate = birthDate.getFullYear()+"-"+(Number(birthDate.getMonth())+1)+"-"+birthDate.getDate();
    let personalInfo = {
        firstName,
        lastName,
        birthDate,
        country,
        city,
        phoneNumber,
    };
    res.json({message:'success',personalInfo});
};

//Update Personal Information
module.exports.updatePerosnalInfo = async (req,res) => {
    const {
        _id,
        firstName,
        lastName,
        birthDate,
        country,
        city,
        phoneNumber 
    } = req.body;
    let user = await userModel.findOne({phoneNumber});
    if(!user || _id == user._id){
        await userModel.findOneAndUpdate({_id},{
            firstName,
            lastName,
            birthDate,
            country,
            city,
            phoneNumber 
        });
        res.json({message:'success'});
    }
    else{
        res.json({message:'phone already exists'});
    }    
};

