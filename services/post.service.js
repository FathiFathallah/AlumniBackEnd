const { postModel } = require("../models/post.model");
const { orginizationModel } = require("../models/orginization.model");
const fs = require("fs");
const { userModel } = require("../models/user.model");
const { getPosts } = require("../function/getPosts");
const path = require("path");

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

  // let posts = postsArray.map((element) => {
  //   element = element.toJSON();
  //   delete element._id;
  //   delete element.orginizationId;
  //   delete element.__v;
  //   delete element.createdAt;
  //   element.likes = element.likes.length;
  //   element.comments = element.comments.length;
  //   let date = new Date(element.updatedAt);
  //   let time = date.toLocaleTimeString();
  //   element.time =
  //     time.slice(0, 5) +
  //     time.slice(8, 11) +
  //     ", " +
  //     date.toLocaleDateString().replace(/\//g, ".");
  //   delete element.updatedAt;
  //   let mediaFile = fs.readFileSync(
  //     __dirname.substring(0, __dirname.length - 8) +
  //       "mediaFiles\\" +
  //       element.mediaFile
  //   );
  //   element.mediaFile = mediaFile;
  //   return element;
  // });
  // posts = posts.reverse();

  let postsResponse = getPosts(postsArray);
  res.json({ message: "success", postsResponse });
};

module.exports.getTimelinePosts = async (req, res) => {
  let postsResponse = [];
  const { _id } = req.params;
  const { followedChannelsMemberships } = await userModel.findOne({ _id });
  let posts = await postModel.find({});
  for (let i = 0; i < posts.length; i++) {
    if (followedChannelsMemberships.includes(posts[i].orginizationId)) {
      let a = path.extname(posts[i].mediaFile).toLowerCase();
      let mediaType;
      if (
        a == ".jpeg" ||
        a == ".jpg" ||
        a == ".png" ||
        a == ".tiff" ||
        a == ".gif"
      ) {
        mediaType = "img";
      } else if (
        a == ".mp4" ||
        a == ".m4a" ||
        a == ".f4v" ||
        a == ".m4b" ||
        a == ".mov"
      ) {
        mediaType = "video";
      }
      postsResponse.push({
        post: posts[i],
        mediaType,
        liked: posts[i].likes.includes(_id),
      });
    }
  }
  res.json({ message: "success", postsResponse: getPosts(postsResponse) });
};

module.exports.getPostMedia = async (req, res) => {
  const { _id } = req.params;
  let post = await postModel.findOne({ _id });
  const { mediaFile } = post;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) + "//mediaFiles//" + mediaFile
  );
};

//GET POST INFO
module.exports.getPostLikes = async (req, res) => {
  let postLikes = [];
  const { _id } = req.params;
  let post = await postModel.findOne({ _id });
  for (let i = 0; i < post.likes.length; i++) {
    let user = await userModel.findOne({ _id: post.likes[i] });
    const { firstName, lastName, studyField } = user;
    postLikes.push({ _id: user._id, firstName, lastName, studyField });
  }
  res.json({ message: "success", postLikes });
};

module.exports.getPostComments = async (req, res) => {
  let postComments = [];
  const { _id } = req.params;
  let post = await postModel.findOne({ _id });
  for (let i = 0; i < post.comments.length; i++) {
    let user = await userModel.findOne({ _id: post.comments[i]._id });
    const { firstName, lastName, studyField } = user;
    postComments.push({
      commentId: i,
      comment: post.comments[i].comment,
      _id: user._id,
      firstName,
      lastName,
      studyField,
    });
  }
  res.json({ message: "success", comments: postComments });
};

//INTERACTION
module.exports.addLike = async (req, res) => {
  const { _id, postId } = req.body;
  await postModel.findOneAndUpdate(
    { _id: postId },
    { $addToSet: { likes: _id } }
  );
  res.json({ message: "success" });
};

module.exports.removeLike = async (req, res) => {
  const { _id, postId } = req.body;
  await postModel.findOneAndUpdate({ _id: postId }, { $pull: { likes: _id } });
  res.json({ message: "success" });
};

module.exports.addComment = async (req, res) => {
  const { _id, postId, comment } = req.body;
  await postModel.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: { _id, comment } } }
  );
  res.json({ message: "success" });
};

module.exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.body;
  let post = await postModel.findOne({ _id: postId });
  await postModel.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: post.comments[commentId] } }
  );
  res.json({ message: "success" });
};
