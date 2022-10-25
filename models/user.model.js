const { mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    birthDate:{
        type: Date,
        min: '1980-09-28',
        max: '2005-1-1'
    },
    emailAddress:String,
    country:String,
    phoneNumber:String,
    studyField:String,
    studyState:String,
    userName:String,
    password:String,
    emailConfirm:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false        
    }
},{
    timestamps:true,
});

module.exports.userModel = mongoose.model('users',userSchema);


