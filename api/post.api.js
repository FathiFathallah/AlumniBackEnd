const {
  uploadMediaFileMiddleware,
} = require("../middlewware/upload/post.upload");
const { addPostAssociation } = require("../services/association.service");
const {
  addPost,
  getChannelPosts,
  getTimelinePosts,
  getPostMedia,
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

module.exports = router;
