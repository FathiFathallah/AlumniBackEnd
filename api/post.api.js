const {
  uploadMediaFileMiddleware,
} = require("../middlewware/upload/post.upload");
const { addPostAssociation } = require("../services/association.service");
const { addPost, getChannelPosts } = require("../services/post.service");

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

module.exports = router;
