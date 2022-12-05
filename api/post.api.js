const { uploadMediaFileMiddleware } = require('../middlewware/upload/post.upload');
const { addPost, getPost } = require('../services/post.service');

const router = require('express').Router();


router.put('/api/post/newPost', uploadMediaFileMiddleware, addPost);
router.get('/api/post/getPost/:_id', getPost)



module.exports = router;