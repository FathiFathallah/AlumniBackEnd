const { mongoose } = require('mongoose');

const orginizationSchema = mongoose.Schema({
    orginizationName:String,
    channelName:String,
    description:String,
    expertName:String,
    category:Array,
    expertPhoneNumber:String,
    followers:{
        type:Array,
        default:[],
    },
    posts:{
        type:Array,
        default:[],
    },
    events:{
        type:Array,
        default:[],
    },
    country:String,
    city:String,
    coverImg:String,
    expertImg:String,
    expertEmailAddress:{
        type:String,
        required:true,
        unique:true,
    },
    password:String
},{
    timestamps:true,
});

module.exports.orginizationModel = mongoose.model('orginizations',orginizationSchema);


