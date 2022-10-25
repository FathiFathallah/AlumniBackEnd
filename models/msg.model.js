const { mongoose } = require('mongoose');

const msgSchema = mongoose.Schema({
    message:String,
    userId:mongoose.SchemaTypes.ObjectId,
},{
    timestamps:true,
});

module.exports.msgModel = mongoose.model('message',msgSchema);


