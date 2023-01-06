const {
  uniUploadCoverImgMiddleware,
} = require("../middlewware/upload/university.upload");
const { signUpUniversities } = require("../services/university.service");

const router = require("express").Router();

router.post(
  "/api/university/signUp",
  uniUploadCoverImgMiddleware,
  signUpUniversities
);

module.exports = router;
