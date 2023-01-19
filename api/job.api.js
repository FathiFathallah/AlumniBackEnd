const {
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getJobApplicants,
  deleteApplication,
  getUserApplication,
  applyToJob,
  getUserJobs,
} = require("../services/job.service");

const router = require("express").Router();

router.put("/api/job/addNewJob", addJob);
router.get("/api/job/getAllJobs/:_id", getJobs);
router.get("/api/job/getJob/:_id", getJob);
router.put("/api/job/updateJob", updateJob);
router.get("/api/job/getJobApplicants/:_id", getJobApplicants);
router.get("/api/job/getUserApplication/:_id", getUserApplication);
router.delete("/api/job/deleteApplication", deleteApplication);
router.delete("/api/job/deleteJob/:_id", deleteJob);

//API
router.put("/api/job/applyToJob", applyToJob);
router.get("/api/job/getAllJobsByDeadlineForUsers", getUserJobs);

module.exports = router;
