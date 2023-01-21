const {
  getAlumniIcon,
  getCheckSign,
  getErrorSign,
} = require("../services/email.service");

const router = require("express").Router();

router.get("/api/getAlumniIcon", getAlumniIcon);
router.get("/api/getCheckSign", getCheckSign);
router.get("/api/getErrorSign", getErrorSign);

module.exports = router;
