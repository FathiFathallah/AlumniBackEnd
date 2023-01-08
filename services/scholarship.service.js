const { scolarshipModel } = require("../models/scholarship.model");

module.exports.getScholarships = async (req, res) => {
  let scholarships = await scolarshipModel.find({});
  res.json({ message: "success", scholarships });
};

module.exports.addScholarship = async (req, res) => {
  const {
    universityId,
    scolarshipName,
    postDate,
    deadline,
    scholarshipDescription,
    scholarshipOverview,
    scholarshipMissions,
  } = req.body;
  await scolarshipModel.insertMany({
    universityId,
    scolarshipName,
    postDate,
    deadline,
    scholarshipDescription,
    scholarshipOverview,
    scholarshipMissions,
  });
  res.json({ message: "success" });
};
