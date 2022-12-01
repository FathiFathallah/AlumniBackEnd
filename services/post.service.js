const { postModel } = require('../models/post.model');

module.exports.addPost = async (req,res) => {
    const { _id, description } = req.body;
    const mediaFile = req.file.filename;
    await postModel.insertMany({expertId:_id,description,mediaFile});
    res.json({message:"haha"});
};

module.exports.getPost = async (req, res) => {
    const { _id } = req.params;
    const users = await postModel.find({expertId:_id});
    console.log(users);
    res.json({message:"haha"});
};