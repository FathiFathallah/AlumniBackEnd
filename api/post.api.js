const {
  uploadMediaFileMiddleware,
} = require("../middlewware/upload/post.upload");
const { addPost, getChannelPosts } = require("../services/post.service");

const router = require("express").Router();

router.put(
  "/api/post/orginization/newPost",
  uploadMediaFileMiddleware,
  addPost
);
router.get("/api/post/getChannelsPosts/:_id", getChannelPosts);

module.exports = router;
