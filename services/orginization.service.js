const { orginizationModel } = require('../models/orginization.model');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {

    const {   orginizationName,
        channelName,
        description,
        expertName,
        category,
        country,
        expertEmailAddress,
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
                expertEmailAddress,
                coverImg:req.file.filename,
                password:hash });
            res.json({message:`success`});
        });
    
    }
};


