const { postModel } = require("../models/post.model");
const { orginizationModel } = require("../models/orginization.model");
const fs = require("fs");

module.exports.addPost = async (req, res) => {
  const { _id, description } = req.body;
  let orginization = await orginizationModel.findOne({ _id });
  const { channelName, expertName } = orginization;
  const mediaFile = req.file.filename;
  const [post] = await postModel.insertMany({
    orginizationId: _id,
    description,
    mediaFile,
    channelName,
    expertName,
    type: "orginization",
  });
  await orginizationModel.findOneAndUpdate(
    { _id },
    { $addToSet: { posts: post._id } }
  );
  res.json({ message: "success" });
};

module.exports.getChannelPosts = async (req, res) => {
  const { _id } = req.params;
  let postsArray = await postModel.find({ orginizationId: _id });

  let posts = postsArray.map((element) => {
    element = element.toJSON();
    delete element._id;
    delete element.orginizationId;
    delete element.__v;
    delete element.createdAt;
    element.likes = element.likes.length;
    element.comments = element.comments.length;
    let date = new Date(element.updatedAt);
    let time = date.toLocaleTimeString();
    element.time =
      time.slice(0, 5) +
      time.slice(8, 11) +
      ", " +
      date.toLocaleDateString().replace(/\//g, ".");
    delete element.updatedAt;
    let mediaFile = fs.readFileSync(
      __dirname.substring(0, __dirname.length - 8) +
        "mediaFiles\\" +
        element.mediaFile
    );
    element.mediaFile = mediaFile;
    return element;
  });
  posts = posts.reverse();
  res.json({ message: "success", posts });
};
