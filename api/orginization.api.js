const { signUp, getOrgInformation, updateChannelInformation, updateExpertInfo, updateChannelCover } = require('../services/orginization.service');
const { uploadcoverImgMiddleware, expertImgUploadMiddleware } = require('../middlewware/upload/orginization.upload');

const router = require('express').Router();

router.post('/api/orginization/signUp', uploadcoverImgMiddleware, signUp);
router.get('/api/orginization/getOrgInfo/:_id', getOrgInformation);
router.put('/api/orginization/updateChannelInfo', updateChannelInformation);
router.put('/api/orginization/updateExpertInfo', expertImgUploadMiddleware, updateExpertInfo);
router.put('/api/orginization/updateChannelCover', expertImgUploadMiddleware, updateChannelCover);



module.exports = router;