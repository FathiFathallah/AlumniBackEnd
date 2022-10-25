const { signUp, logIn, emailVerify } = require('../services/user.service');
const { userValidation } = require('../middlewware/validation/user.validate');
const router = require('express').Router();
router.post('/signUp', userValidation, signUp);
router.post('/logIn', logIn);
router.get('/signUp/verify/:token', emailVerify);

module.exports = router;