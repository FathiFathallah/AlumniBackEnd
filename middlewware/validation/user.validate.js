const joi = require('joi');

//SignUp User Validation
const validationSchema = joi.object({
    firstName:joi.string().required().max(50),
    lastName:joi.string().required().min(1).max(50),
    birthDate:joi.date().min('1980-09-28').max('2005-1-1'),
    emailAddress:joi.string().email().required(),
    country:joi.string().required().min(1),
    phoneNumber:joi.string().min(10).max(15).regex(/^\d+$/), 
    studyField:joi.string().required().min(1),
    studyState:joi.string().required().min(1),
    userName:joi.string().required().min(1),
    password:joi.string().min(8),
});

module.exports.userValidation = (req, res, next) => {
    let msgArray = [];
    const { error } = validationSchema.validate(req.body,{abortEarly:true});
    if(!error){
        next();
    }
    else{
        // error.details.map( (ele) => {
        //     msgArray.push(ele.message);
        // });
        // res.json(msgArray);
        if(error.details[0].message.includes("birthDate")){
            res.json({message:"birthDate must be less than or equal to 2005-1-1"});
        }
        if(error.details[0].message.includes("pattern")){
            res.json({message:"phoneNumber must be a number"});
        }
        else{
            res.json({message:error.details[0].message.replace(/[^\w\s]/gi, '')});
        }
    }
};

//Update Personal Information Validation
const updateValidationSchema = joi.object({
    _id:joi.string().required(),
    firstName:joi.string().required().max(50),
    lastName:joi.string().required().min(1).max(50),
    birthDate:joi.date().min('1980-09-28').max('2005-1-1'),
    country:joi.string().required().min(1),
    city:joi.string().required().min(1),
    phoneNumber:joi.string().min(10).max(15).regex(/^\d+$/),
});

module.exports.updateValidation = (req, res, next) => {
    const { error } = updateValidationSchema.validate(req.body,{abortEarly:true});
    if(!error){
        next();
    }
    else{
        if(error.details[0].message.includes("birthDate")){
            res.json({message:"birthDate must be less than or equal to 2005-1-1"});
        }
        if(error.details[0].message.includes("pattern")){
            res.json({message:"phoneNumber must be a number"});
        }
        else{
            res.json({message:error.details[0].message.replace(/[^\w\s]/gi, '')});
        }
    }
};


//Update Account Information Validation
const accountInfovalidationSchema = joi.object({
    _id:joi.string().required(),
    userName:joi.string().required().min(1),
    emailAddress:joi.string().email().required(),
    about:joi.string().required()
});

module.exports.accountInfovalidation = (req, res, next) => {
    const { error } = accountInfovalidationSchema.validate(req.body,{abortEarly:true});
    if(!error){
        next();
    }
    else{
            res.json({message:error.details[0].message.replace(/[^\w\s]/gi, '')});
    }
};