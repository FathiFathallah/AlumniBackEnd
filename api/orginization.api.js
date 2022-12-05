const { signUp } = require('../services/orginization.service');
const { uploadcoverImgMiddleware } = require('../middlewware/upload/orginization.upload');

const router = require('express').Router();

router.post('/api/orginization/signUp', uploadcoverImgMiddleware, signUp);



module.exports = router;