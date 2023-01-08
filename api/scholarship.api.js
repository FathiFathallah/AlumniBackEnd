const {
  getScholarships,
  addScholarship,
} = require("../services/scholarship.service");

const router = require("express").Router();
router.put("/api/scholarships/AddScholarships", addScholarship);

router.get("/api/scholarships/getUserScholarships", getScholarships);

module.exports = router;
