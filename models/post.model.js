const { mongoose } = require('mongoose');

const postSchema = mongoose.Schema({
    channelId:{
        type:String,
        required:true,
    },
    expert:{
        type:String,
        max:100
    },
    description:{
        type:String,
        max:500
    },
    file:{
        type:String
    },
    likes:{
        type:Array,
        default:[],
    },
    comments:{
        type:Array,
        default:[],
    }
},{
    timestamps:true,
});

module.exports.postModel = mongoose.model('posts',postSchema);


