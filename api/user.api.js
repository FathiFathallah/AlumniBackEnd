const { signUp, logIn, emailVerify, getPerosnalInfo, updatePerosnalInfo, uploadUserProfilePic, uploadUserCV, getAccountInfo, updateAccountInfo, getAllInfo, updateSkills, updatePosition, updateEducation, getProfilePicture, getCV, updateExperience, getExperience, getExperienceFile, getEducation, getPositions, getSkills, getFileTest } = require('../services/user.service');
const { userValidation, updateValidation, accountInfovalidation } = require('../middlewware/validation/user.validate');
const { uploadPicMiddleware, uploadCVMiddleware, uploadExperienceFileMiddleware } = require('../middlewware/upload/user.upload');

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


//TEST
router.get('/getFileTest/:_id', getFileTest);


module.exports = router;