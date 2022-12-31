const { associationModel } = require("../models/association.model");
const bcrypt = require("bcrypt");
const { postModel } = require("../models/post.model");

module.exports.signUp = async (req, res) => {
  const {
    associationName,
    description,
    expertName,
    category,
    expertPhoneNumber,
    country,
    city,
    expertEmailAddress,
    password,
  } = req.body;
  const userEmail = await associationModel.findOne({ expertEmailAddress });
  if (userEmail) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      await associationModel.insertMany({
        associationName,
        description,
        expertName,
        category,
        expertPhoneNumber,
        country,
        city,
        expertEmailAddress,
        coverImg: req.files[0].filename,
        expertImg: req.files[1].filename,
        password: hash,
      });
      res.json({ message: `success` });
    });
  }
};

module.exports.addPostAssociation = async (req, res) => {
  const { _id, description } = req.body;
  const association = await associationModel.findOne({ _id });
  if (!association) {
    res.json({ message: "does not exist" });
  } else {
    const mediaFile = req.file.filename;
    const [post] = await postModel.insertMany({
      channelName: association.associationName,
      orginizationId: _id,
      description,
      mediaFile,
      expertName: association.expertName,
      type: "association",
    });

    await associationModel.findOneAndUpdate(
      { _id },
      { $addToSet: { posts: post._id } }
    );
    res.json({ message: "success" });
  }
};
