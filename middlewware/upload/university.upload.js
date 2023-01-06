const multer = require("multer");

//FOR ORGINIZATION COVER AND EXPERT FILES
const coverImgStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./universityCoverImgExpert");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const coverImgUpload = multer({ storage: coverImgStorageEngine });
module.exports.uniUploadCoverImgMiddleware =
  coverImgUpload.array("coverImgwithExpert");
