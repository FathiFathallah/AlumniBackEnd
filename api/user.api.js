const { signUp, logIn, emailVerify, getPerosnalInfo, updatePerosnalInfo, uploadUserProfilePic, uploadUserCV, getAccountInfo, updateAccountInfo, getAllInfo, updateSkills, updatePosition, updateEducation, getProfilePicture, getCV, updateExperience, getExperience, getExperienceFile, getEducation, getPositions, getSkills, getFileTest, getAllDocumentsNames, getDocumentFile } = require('../services/user.service');
const { changeExperience, deleteExperience, changeEducation, deleteEducation, changePosition, deletePosition, changeSkills, deleteSkills, uploadDocuments } = require('../services/user.service');
const { userValidation, updateValidation, accountInfovalidation } = require('../middlewware/validation/user.validate');
const { uploadPicMiddleware, uploadCVMiddleware, uploadExperienceFileMiddleware, uploadUserDocumentsFileMiddleware, uploadUserDocumentsFileMiddlewares } = require('../middlewware/upload/user.upload');

const router = require('express').Router();
//Sign Up and LogIn
router.post('/signUp', userValidation, signUp);
router.post('/logIn', logIn);
router.get('/signUp/verify/:token', emailVerify);

//Get Requests mainly to fetch data
router.get('/personalInfo/:_id', getPerosnalInfo);
router.get('/getProfilePicture/:_id', getProfilePicture);
router.get('/getCV/:_id', getCV);
router.get('/accountInfo/:_id', getAccountInfo);
router.get('/experience/:_id', getExperience);
router.post('/experienceFile', getExperienceFile);
router.get('/getEducation/:_id', getEducation);
router.get('/getPositions/:_id', getPositions);
router.get('/getSkills/:_id', getSkills);
router.get('/AllData/:_id', getAllInfo);

//Update Requests
router.put('/personalInfo/update',updateValidation, updatePerosnalInfo);
router.put('/uploadProfilePic', uploadPicMiddleware, uploadUserProfilePic);
router.put('/uploadCV', uploadCVMiddleware, uploadUserCV);
router.put('/accountInfo/update',accountInfovalidation, updateAccountInfo);
router.put('/addSkill/update', updateSkills);
router.put('/addPosition/update', updatePosition);
router.put('/addEducation/update', updateEducation);
router.put('/addExperience/update',uploadExperienceFileMiddleware, updateExperience);


//Document Files
router.put('/uploadDocuments/update',uploadUserDocumentsFileMiddleware, uploadDocuments);
router.get('/getAllDocumentsNames/get/:_id', getAllDocumentsNames);
router.post('/getDocumentFile/get', getDocumentFile);




//Update and Change Requests + DELETE REQUESTS
router.put('/changeExperience/update',uploadExperienceFileMiddleware, changeExperience);
router.delete('/deteleExperience/update', deleteExperience);

router.put('/changeEducation/update', changeEducation);
router.delete('/deleteEducation/update', deleteEducation);

router.put('/changePosition/update', changePosition);
router.delete('/deletePosition/update', deletePosition);

router.put('/changeSkill/update', changeSkills);
router.delete('/deleteSkill/update', deleteSkills);



//TEST
router.get('/getFileTest/:_id', getFileTest);


module.exports = router;