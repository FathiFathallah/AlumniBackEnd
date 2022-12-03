const multer = require('multer');
 

//FOR PROFILE PICTURES
const picStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profilePictures');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const picUpload = multer({storage:picStorageEngine});
module.exports.uploadPicMiddleware = picUpload.single('profilePicture');

//FOR CV FILES
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resumesCV');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const CVUpload = multer({storage:fileStorageEngine});
module.exports.uploadCVMiddleware = CVUpload.single('CV');


//FOR EXPERIENCE FILES
const experienceStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './experiencesFiles');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const ExperienceFileUpload = multer({storage:experienceStorageEngine});
module.exports.uploadExperienceFileMiddleware = ExperienceFileUpload.single('experienceFile');



//FOR DOCUMENT FILES
const documentStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './documentFiles');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const documentFileUpload = multer({storage:documentStorageEngine});
module.exports.uploadUserDocumentsFileMiddleware = documentFileUpload.array('documentFiles');
