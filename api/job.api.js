const { addJob, getJobs } = require('../services/job.service');

const router = require('express').Router();


router.put('/api/job/addNewJob', addJob);
router.get('/api/job/getAllJobs/:_id', getJobs);



module.exports = router;