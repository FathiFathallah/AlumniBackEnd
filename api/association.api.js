const {
  uploadcoverImgMiddleware,
} = require("../middlewware/upload/association.upload");
const {
  signUp,
  memberUser,
  getAssociationsforUser,
  getRecommendedAssociationsforUser,
  getAssociationCoverPic,
  getAssociationProfilePic,
  getAllAssociations,
} = require("../services/association.service");

const router = require("express").Router();

router.post("/api/association/signUp", uploadcoverImgMiddleware, signUp);

//BE a Member
router.put("/api/association/becomeMember", memberUser);
//Get Association
router.get("/api/association/getUserMemberships/:_id", getAssociationsforUser);
//Get Recommended Association
router.get(
  "/api/association/getUserRecommendedMemberships/:_id",
  getRecommendedAssociationsforUser
);

router.get(
  "/api/association/getAssociationCoverPic/:_id",
  getAssociationCoverPic
);

router.get(
  "/api/association/getAssociationProfilePic/:_id",
  getAssociationProfilePic
);

router.get("/api/association/getAllAssociations", getAllAssociations);

module.exports = router;
