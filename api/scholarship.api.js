const {
  getScholarships,
  addScholarship,
  applyToScolarship,
  getScolarshipUniId,
  getScolarshipApplicants,
  deleteApplicationScolarship,
  deleteScholarship,
  getScholarshipInfo,
} = require("../services/scholarship.service");

const router = require("express").Router();
router.put("/api/scholarships/AddScholarships", addScholarship);

router.get("/api/scholarships/getUserScholarships", getScholarships);

router.get("/api/scholarships/getAllScholarships", getScholarships);

//APIS
router.put("/api/scholarships/applyToScolarship", applyToScolarship);
router.get("/api/scholarships/getScolarshipUniId/:_id", getScolarshipUniId);
router.get(
  "/api/scholarships/getScolarshipApplicants/:_id",
  getScolarshipApplicants
);

router.delete("/api/scholarships/deleteScholarship/:_id", deleteScholarship);

router.delete(
  "/api/scholarships/deleteApplication",
  deleteApplicationScolarship
);

router.get("/api/scholarships/getScholarshipInfo/:_id", getScholarshipInfo);

module.exports = router;
