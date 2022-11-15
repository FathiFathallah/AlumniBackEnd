const { signUp, logIn, emailVerify, getPerosnalInfo, updatePerosnalInfo, uploadUserProfilePic, uploadUserCV, getAccountInfo, updateAccountInfo } = require('../services/user.service');
const { userValidation, updateValidation, accountInfovalidation } = require('../middlewware/validation/user.validate');
const { uploadPicMiddleware, uploadCVMiddleware } = require('../middlewware/upload/user.upload');

const router = require('express').Router();
router.post('/signUp', userValidation, signUp);
router.post('/logIn', logIn);
router.get('/signUp/verify/:token', emailVerify);
router.get('/personalInfo/:_id', getPerosnalInfo);
router.put('/personalInfo/update',updateValidation, updatePerosnalInfo);
router.put('/uploadProfilePic', uploadPicMiddleware, uploadUserProfilePic);
router.put('/uploadCV', uploadCVMiddleware, uploadUserCV);
router.get('/accountInfo/:_id', getAccountInfo);
router.put('/accountInfo/update',accountInfovalidation, updateAccountInfo);




module.exports = router;