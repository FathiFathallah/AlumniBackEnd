const {
  signUp,
  getOrgInformation,
  updateChannelInformation,
  updateExpertInfo,
  updateChannelCover,
  getChannelforUser,
  followChannelforUser,
  getRecommendedChannelforUser,
  unfollowChannelforUser,
  getOrginizationCoverPic,
  getOrginizationProfilePic,
  getAllOrginizations,
} = require("../services/orginization.service");
const {
  uploadcoverImgMiddleware,
  expertImgUploadMiddleware,
} = require("../middlewware/upload/orginization.upload");

const router = require("express").Router();

router.post("/api/orginization/signUp", uploadcoverImgMiddleware, signUp);
router.get("/api/orginization/getOrgInfo/:_id", getOrgInformation);
router.put("/api/orginization/updateChannelInfo", updateChannelInformation);
router.put(
  "/api/orginization/updateExpertInfo",
  expertImgUploadMiddleware,
  updateExpertInfo
);
router.put(
  "/api/orginization/updateChannelCover",
  expertImgUploadMiddleware,
  updateChannelCover
);

//Follow Channel for User
router.put("/api/orginization/followChannel", followChannelforUser);
//Unfollow Channel for User
router.put("/api/orginization/unfollowChannel", unfollowChannelforUser);
//get User Followed Channels for User
router.get("/api/orginization/getUserChannels/:_id", getChannelforUser);
//get User Recommended Channels for User
router.get(
  "/api/orginization/getUserRecommendedChannels/:_id",
  getRecommendedChannelforUser
);

router.get(
  "/api/orginization/getOrginizationCoverPic/:_id",
  getOrginizationCoverPic
);

router.get(
  "/api/orginization/getOrginizationProfilePic/:_id",
  getOrginizationProfilePic
);

router.get("/api/orginization/getAllOrginizations", getAllOrginizations);

module.exports = router;
