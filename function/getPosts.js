const fs = require("fs");

module.exports.getPosts = (posts) => {
  let postsResponse = posts.map((element) => {
    const { liked, mediaType } = element;
    element = element.post.toJSON();
    delete element.__v;
    delete element.updatedAt;
    element.likes = element.likes.length;
    element.comments = element.comments.length;
    element.liked = liked;
    element.mediaType = mediaType;
    let date = new Date(element.createdAt);
    let time = date.toLocaleTimeString();
    element.time =
      time.slice(0, 5) +
      time.slice(8, 11) +
      ", " +
      date.toLocaleDateString().replace(/\//g, ".");
    delete element.updatedAt;
    return element;
  });
  return postsResponse;
};
