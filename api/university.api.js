const {
  uniUploadCoverImgMiddleware,
} = require("../middlewware/upload/university.upload");
const {
  signUpUniversities,
  getAllUniversities,
} = require("../services/university.service");

const router = require("express").Router();

router.post(
  "/api/university/signUp",
  uniUploadCoverImgMiddleware,
  signUpUniversities
);

router.get("/api/university/getAllUniversities", getAllUniversities);
module.exports = router;
