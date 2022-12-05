const { orginizationModel } = require('../models/orginization.model');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {

    const {   orginizationName,
        channelName,
        description,
        expertName,
        category,
        country,
        city,
        expertEmailAddress,
        expertPhoneNumber,
        password
    } = req.body;
    const userEmail = await orginizationModel.findOne({expertEmailAddress});
    if(userEmail){
        res.json({message:'email already exists'})
    }
    else{
        bcrypt.hash(password, 4, async (err, hash)=>{
            await orginizationModel.insertMany({ orginizationName,
                channelName,
                description,
                expertName,
                category,
                country,
                city,
                expertEmailAddress,
                expertPhoneNumber,
                coverImg:req.files[0].filename,
                expertImg:req.files[1].filename,
                password:hash });
            res.json({message:`success`});
        });
    
    }
};


