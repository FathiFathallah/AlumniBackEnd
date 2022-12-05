const { postModel } = require('../models/post.model');
const { orginizationModel } = require('../models/orginization.model');

module.exports.addPost = async (req,res) => {
    const { _id, description } = req.body;
    let orginization = await orginizationModel.findOne({_id});
    const {
        channelName,
        expertName,
    } = orginization
    const mediaFile = req.file.filename;
    await postModel.insertMany({
        orginizationId:_id,
        description,
        mediaFile,
        channelName,
        expertName
    });
    res.json({message:"success"});
};

module.exports.getPost = async (req, res) => {
    const { _id } = req.params;
    const users = await postModel.find({expertId:_id});
    console.log(users);
    res.json({message:"haha"});
};