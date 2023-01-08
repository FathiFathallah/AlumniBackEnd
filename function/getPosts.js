const fs = require("fs");

module.exports.getPosts = (posts) => {
  let postsResponse = posts.map((element) => {
    element = element.toJSON();
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
  postsResponse = postsResponse.reverse();
  return postsResponse;
};
