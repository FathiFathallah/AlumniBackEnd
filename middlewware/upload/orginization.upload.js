const multer = require('multer');
 

//FOR POSTS MEDIA FILES
const coverImgStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './coverImg');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const coverImgUpload = multer({storage:coverImgStorageEngine});
module.exports.uploadcoverImgMiddleware = coverImgUpload.single('coverImg');