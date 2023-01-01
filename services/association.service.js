const { associationModel } = require("../models/association.model");
const bcrypt = require("bcrypt");
const { postModel } = require("../models/post.model");
const fs = require("fs");

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

//MEMBERSHIPS
module.exports.memberUser = async (req, res) => {
  const { _id, associationId } = req.body;
  await associationModel.findOneAndUpdate(
    { _id: associationId },
    { $addToSet: { members: _id } }
  );
  res.json({ message: "success" });
};

module.exports.getAssociationsforUser = async (req, res) => {
  const { _id } = req.params;
  let associations = await associationModel.find({ members: { $in: _id } });

  for (let i = 0; i < associations.length; i++) {
    let {
      associationName,
      description,
      expertName,
      category,
      country,
      city,
      expertImg,
      coverImg,
    } = associations[i];

    let associationsExpertImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "coverImgWithExpert\\" +
        expertImg
    );
    let associationsCoverImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "coverImgWithExpert\\" +
        coverImg
    );
    associations[i] = {
      associationName,
      description,
      expertName,
      category: category[0],
      country,
      city,
      associationsExpertImg,
      associationsCoverImg,
    };
  }
  res.json({ message: "success", associations });
};

module.exports.getRecommendedAssociationsforUser = async (req, res) => {
  const { _id } = req.params;
  let associations = await associationModel.find({});
  for (let i = 0; i < associations.length; i++) {
    let {
      associationName,
      description,
      expertName,
      category,
      country,
      city,
      expertImg,
      coverImg,
    } = associations[i];

    let associationsExpertImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "coverImgWithExpert\\" +
        expertImg
    );
    let associationsCoverImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "coverImgWithExpert\\" +
        coverImg
    );
    associations[i] = {
      associationName,
      description,
      expertName,
      category: category[0],
      country,
      city,
      associationsExpertImg,
      associationsCoverImg,
    };
  }
  res.json({ message: "success", associations });
};
