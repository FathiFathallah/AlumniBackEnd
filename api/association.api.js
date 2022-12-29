const {
  uploadcoverImgMiddleware,
} = require("../middlewware/upload/association.upload");
const { signUp } = require("../services/association.service");

const router = require("express").Router();

router.post("/api/association/signUp", uploadcoverImgMiddleware, signUp);

module.exports = router;
