const fs = require("fs");

module.exports.getPosts = (posts) => {
  let postsResponse = posts.map((element) => {
    element = element.toJSON();
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
    return element;
  });
  postsResponse = postsResponse.reverse();
  return postsResponse;
};
