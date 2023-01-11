const { orginizationModel } = require("../models/orginization.model");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { userModel } = require("../models/user.model");

module.exports.signUp = async (req, res) => {
  const {
    orginizationName,
    channelName,
    description,
    expertName,
    category,
    country,
    city,
    expertEmailAddress,
    expertPhoneNumber,
    password,
  } = req.body;
  const userEmail = await orginizationModel.findOne({ expertEmailAddress });
  if (userEmail) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      await orginizationModel.insertMany({
        orginizationName,
        channelName,
        description,
        expertName,
        category,
        country,
        city,
        expertEmailAddress,
        expertPhoneNumber,
        coverImg: req.files[0].filename,
        expertImg: req.files[1].filename,
        password: hash,
      });
      res.json({ message: `success` });
    });
  }
};

module.exports.getOrgInformation = async (req, res) => {
  const { _id } = req.params;
  const orginization = await orginizationModel.findOne({ _id });
  let {
    orginizationName,
    channelName,
    description,
    expertName,
    expertPhoneNumber,
    category,
    followers,
    posts,
    events,
    country,
    city,
    expertEmailAddress,
    jobs,
    expertImg,
    coverImg,
  } = orginization;
  let orgInfo = {
    orginizationName,
    channelName,
    description,
    expertName,
    expertPhoneNumber,
    category: category[0],
    followersNum: followers.length,
    postsNum: posts.length,
    eventsNum: events.length,
    country,
    city,
    expertEmailAddress,
    jobsNum: jobs.length,
    expertImg,
    coverImg,
  };
  let channelExpertImg = fs.readFileSync(
    __dirname.substring(0, __dirname.length - 8) +
      "//coverImgWithExpert//" +
      expertImg
  );
  let channelCoverImg = fs.readFileSync(
    __dirname.substring(0, __dirname.length - 8) +
      "//coverImgWithExpert//" +
      coverImg
  );
  res.json({ message: "success", orgInfo, channelExpertImg, channelCoverImg });
};

module.exports.updateChannelInformation = async (req, res) => {
  const {
    _id,
    orginizationName,
    channelName,
    country,
    city,
    category,
    description,
  } = req.body;
  let org = await orginizationModel.findOne({ _id });
  if (org) {
    await orginizationModel.findOneAndUpdate(
      { _id },
      {
        orginizationName,
        channelName,
        country,
        city,
        category,
        description,
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "org does not exist" });
  }
};

module.exports.updateExpertInfo = async (req, res) => {
  const { _id, firstName, lastName, expertPhoneNumber, expertEmailAddress } =
    req.body;
  let expertName = firstName + " " + lastName;
  let org = await orginizationModel.findOne({ _id });
  if (org) {
    await orginizationModel.findOneAndUpdate(
      { _id },
      {
        expertName,
        expertPhoneNumber,
        expertEmailAddress,
        expertImg: req.file.filename,
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "org does not exist" });
  }
};

module.exports.updateChannelCover = async (req, res) => {
  const { _id } = req.body;
  let org = await orginizationModel.findOne({ _id });
  if (org) {
    await orginizationModel.findOneAndUpdate(
      { _id },
      {
        coverImg: req.file.filename,
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "org does not exist" });
  }
};

//CHANNELS
module.exports.followChannelforUser = async (req, res) => {
  const { _id, channelId } = req.body;
  await orginizationModel.findOneAndUpdate(
    { _id: channelId },
    { $addToSet: { followers: _id } }
  );
  await userModel.findOneAndUpdate(
    { _id },
    { $addToSet: { followedChannelsMemberships: channelId } }
  );
  res.json({ message: "success" });
};

module.exports.unfollowChannelforUser = async (req, res) => {
  const { _id, channelId } = req.body;
  await orginizationModel.findOneAndUpdate(
    { _id: channelId },
    { $pull: { followers: _id } }
  );
  await userModel.findOneAndUpdate(
    { _id },
    { $pull: { followedChannelsMemberships: channelId } }
  );
  res.json({ message: "success" });
};

module.exports.getChannelforUser = async (req, res) => {
  const { _id } = req.params;
  let org = await orginizationModel.find({ followers: { $in: _id } });

  for (let i = 0; i < org.length; i++) {
    let {
      orginizationName,
      channelName,
      description,
      expertName,
      category,
      country,
      city,
      expertImg,
      coverImg,
    } = org[i];

    let channelExpertImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "//coverImgWithExpert//" +
        expertImg
    );
    let channelCoverImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "//coverImgWithExpert//" +
        coverImg
    );
    org[i] = {
      orginizationName,
      channelName,
      description,
      expertName,
      category: category[0],
      country,
      city,
      channelExpertImg,
      channelCoverImg,
    };
  }
  res.json({ message: "success", org });
};

module.exports.getRecommendedChannelforUser = async (req, res) => {
  const { _id } = req.params;
  let org = await orginizationModel.find({});
  for (let i = 0; i < org.length; i++) {
    let {
      _id,
      orginizationName,
      channelName,
      description,
      expertName,
      category,
      country,
      city,
      expertImg,
      coverImg,
    } = org[i];
    let channelExpertImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "//coverImgWithExpert//" +
        expertImg
    );
    let channelCoverImg = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "//coverImgWithExpert//" +
        coverImg
    );
    org[i] = {
      _id,
      orginizationName,
      channelName,
      description,
      expertName,
      category: category[0],
      country,
      city,
      channelExpertImg,
      channelCoverImg,
    };
  }
  res.json({ message: "success", org });
};

//PROFILE PICS
module.exports.getOrginizationCoverPic = async (req, res) => {
  const { _id } = req.params;
  let org = await orginizationModel.findOne({ _id });
  const { coverImg } = org;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//coverImgWithExpert//" +
      coverImg
  );
};

module.exports.getOrginizationProfilePic = async (req, res) => {
  const { _id } = req.params;
  let org = await orginizationModel.findOne({ _id });
  const { expertImg } = org;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//coverImgWithExpert//" +
      expertImg
  );
};
