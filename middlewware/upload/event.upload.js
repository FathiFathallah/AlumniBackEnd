const multer = require("multer");

//FOR ORGINIZATION COVER AND EXPERT FILES
const eventThumbnailStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./eventThumbnail");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const eventThumbnailUpload = multer({ storage: eventThumbnailStorageEngine });
module.exports.uploadeventThumbnailMiddleware =
  eventThumbnailUpload.single("eventThumbnail");
