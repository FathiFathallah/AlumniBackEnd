const multer = require('multer');
 

//FOR POSTS MEDIA FILES
const mediaFileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './mediaFiles');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const mediaFileUpload = multer({storage:mediaFileStorageEngine});
module.exports.uploadMediaFileMiddleware = mediaFileUpload.single('mediaFile');