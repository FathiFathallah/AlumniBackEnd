const {
  uploadMediaFileMiddleware,
} = require("../middlewware/upload/post.upload");
const { addPostAssociation } = require("../services/association.service");
const {
  addPost,
  getChannelPosts,
  getTimelinePosts,
  getPostMedia,
  addLike,
  addComment,
  removeLike,
  deleteComment,
  getPostLikes,
  getPostComments,
} = require("../services/post.service");

const router = require("express").Router();

//Orginization
router.put(
  "/api/post/orginization/newPost",
  uploadMediaFileMiddleware,
  addPost
);
router.get("/api/post/getChannelsPosts/:_id", getChannelPosts);

//Memberships | Association
router.put(
  "/api/post/association/newPost",
  uploadMediaFileMiddleware,
  addPostAssociation
);

//GET TIMELINE
router.get("/api/user/getTimelinePosts/:_id", getTimelinePosts);
router.get("/api/posts/getPostMedia/:_id", getPostMedia);

//get information Post
router.get("/api/posts/getPostLikes/:_id", getPostLikes);
router.get("/api/posts/getPostComments/:_id", getPostComments);

//Interactiong with TimeLine
router.put("/api/user/addLike", addLike);
router.delete("/api/user/removeLike", removeLike);
router.put("/api/posts/addComment", addComment);
router.delete("/api/posts/deleteComment", deleteComment);

module.exports = router;
