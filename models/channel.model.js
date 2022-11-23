const { mongoose } = require('mongoose');

const channelSchema = mongoose.Schema({
    name:String,
    description:String,
    orginization:Array,
    experts:Array,
    category:Array,
    followers:Array,
    posts:Array,
    events:Array,
    emailAddress:{
        type:String,
        required:true,
        unique:true,
    },
    country:String,
    emailConfirm:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
});

module.exports.channelModel = mongoose.model('channels',channelSchema);


