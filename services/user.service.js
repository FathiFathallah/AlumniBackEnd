const { userModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../email/user.email');
const path = require('path');

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
        phoneNumber,
        profilePic,
        cv
    } = user;
    birthDate = birthDate.getFullYear()+"-"+(Number(birthDate.getMonth())+1)+"-"+birthDate.getDate();
    let personalInfo = {
        firstName,
        lastName,
        birthDate,
        country,
        city,
        phoneNumber,
        profilePic,
        cv
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


//Upload User Profile Picture
module.exports.uploadUserProfilePic = async (req, res) => {
    const { _id } = req.body;
    let user = await userModel.findOneAndUpdate({_id},{profilePic:req.file.filename});
    if(user)
        res.json({message:'success'}) ;      
    else res.json({message:'something went wrong'});
};

//Upload User CV|RESUME
module.exports.uploadUserCV = async (req, res) => {
    const { _id } = req.body;
    let user = await userModel.findOneAndUpdate({_id},{cv:req.file.filename});
    if(user)
        res.json({message:'success'}) ;      
    else res.json({message:'something went wrong'});
};


//Get Account Information
module.exports.getAccountInfo = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});
    let {
        emailAddress,
        userName,
        about
    } = user;
    let AccountInfo = {
        emailAddress,
        userName,
        about
    };
    res.json({message:'success',AccountInfo});
};

//Update Account Information
module.exports.updateAccountInfo = async (req,res) => {
    const {
        _id,
        emailAddress,
        userName,
        about
    } = req.body;
    let user = await userModel.findOne({emailAddress});
    if(!user || _id == user._id){
        await userModel.findOneAndUpdate({_id},{
            emailAddress,
            userName,
            about
        });
        res.json({message:'success'});
    }
    else{
        res.json({message:'email already exists'});
    }    
};

//GET ALL INFORMATION
module.exports.getAllInfo = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});    
    res.json({message:'success',user});  
};

//Update Skills
module.exports.updateSkills = async (req,res) => {
    const {
        _id,
        newSkill,
    } = req.body;
    let user = await userModel.findOne({_id});
    if(user){
        await userModel.findOneAndUpdate({_id},
            { $addToSet: {skills: newSkill} });
        res.json({message:'success'});
    }
    else{
        res.json({message:'user not found'});
    }    
};


//Update Position
module.exports.updatePosition = async (req,res) => {
    const {
        _id,
        company,
        startDate,
        positionName,
        positionDetails
    } = req.body;
    let user = await userModel.findOne({_id});
    if(user){
        await userModel.findOneAndUpdate({_id},
            { $addToSet: {positions: {
                company,
                startDate,
                positionName,
                positionDetails
            }} });
        res.json({message:'success'});
    }
    else{
        res.json({message:'user not found'});
    }    
};



//Update Education
module.exports.updateEducation = async (req,res) => {
    const {
        _id,
        university,
        faculty,
        specialization,
        degree,
        startDate,
        endDate
    } = req.body;
    let user = await userModel.findOne({_id});
    if(user){
        await userModel.findOneAndUpdate({_id},
            { $addToSet: {education: {
                university,
                faculty,
                specialization,
                degree,
                startDate,
                endDate
            }} });
        res.json({message:'success'});
    }
    else{
        res.json({message:'user not found'});
    }    
};


//Update Experiences
module.exports.updateExperience = async (req,res) => {
    const {
        _id,
        orginization,
        startDate,
        endDate,
        details,
    } = req.body;
    let fileName = req.file.filename;
    let user = await userModel.findOne({_id});
    if(user){
        await userModel.findOneAndUpdate({_id},
            { $addToSet: {experience: {
                experienceId:user.experience.length + 1,
                orginization,
                startDate,
                endDate,
                details,
                fileName
            }} });
        res.json({message:'success'});
    }
    else{
        res.json({message:'user not found'});
    }  

};

//Get Experinece
module.exports.getExperience = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id}); 
    res.json({experience:user.experience})
};


//Get Experinece File
module.exports.getExperienceFile = async (req,res) => {
    let { _id, experienceId } = req.body;
    let user = await userModel.findOne({_id}); 
    const result = user.experience.filter(function (el){
      return el.experienceId == experienceId;
    });
    res.sendFile((__dirname.substring(0, __dirname.length-8) + 'experiencesFiles\\' + result[0].fileName));   
};

//Get Education
module.exports.getEducation = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id}); 
    res.json({education:user.education})
};

//Get Positions
module.exports.getPositions = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id}); 
    res.json({positions:user.positions})
};

//Get Skills
module.exports.getSkills = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id}); 
    res.json({skills:user.skills})
};

// GET PROFILE PICTURE
module.exports.getProfilePicture = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});
    const { profilePic } = user;
    res.sendFile((__dirname.substring(0, __dirname.length-8) + 'profilePictures\\' + profilePic));  
};


// GET CV
module.exports.getCV = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});
    const { cv } = user;
    res.sendFile((__dirname.substring(0, __dirname.length-8) + 'resumesCV\\' + cv));  
};


//TEST | SENDING AND RECEIVING FILES
const fs = require('fs');
module.exports.getFileTest = async (req,res) => {
    let { _id } = req.params;
    let user = await userModel.findOne({_id});
    //res.sendFile((__dirname.substring(0, __dirname.length-8) + 'profilePictures\\1668534880867-284233604-0ab268c8a5918132e1bccb7291a7c351.jpg'));
    let  dataFile = fs.readFileSync((__dirname.substring(0, __dirname.length-8) + 'profilePictures\\' + user.profilePic));
    let a = path.extname(user.profilePic).toLowerCase();
    let type;
    if(a == ".jpeg" || a == ".jpg" || a == ".png" || a == ".tiff" || a == ".gif") {
        type = "img";
    }
    else if(a == ".mp4" || a == ".m4a"|| a == ".f4v" || a == ".m4b" || a == ".mov") {
        type = "video";
    }
    let file = { dataFile , type};
    res.json({message:'success',user,file}); 
};