const { scolarshipModel } = require("../models/scholarship.model");
const { userModel } = require("../models/user.model");

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

//APIS
module.exports.applyToScolarship = async (req, res) => {
  const { _id, scholarshipId } = req.body;
  let user = await userModel.findOne({ _id });
  if (user.documents.length == 4) {
    if (
      user.documents[0].cv != "" &&
      user.documents[1].personalId != "" &&
      user.documents[2].personalPassport != "" &&
      user.documents[3].universityTranscript != ""
    ) {
      await scolarshipModel.findOneAndUpdate(
        { _id: scholarshipId },
        { $addToSet: { applicants: _id } }
      );
      res.json({ message: "success" });
    } else {
      res.json({ message: "user 4 documents must be uploaded" });
    }
  } else {
    res.json({ message: "user 4 documents must be uploaded" });
  }
};

module.exports.getScolarshipUniId = async (req, res) => {
  const { _id } = req.params;
  let currentDate = new Date();
  currentDate = currentDate.toISOString();
  let scholarships = await scolarshipModel.find({
    universityId: _id,
    deadline: { $gt: currentDate },
  });
  res.json({ message: "success", scholarships });
};

module.exports.getScolarshipApplicants = async (req, res) => {
  const { _id } = req.params;
  const scolarship = await scolarshipModel.findOne({ _id });
  const { applicants, scolarshipName } = scolarship;
  let applicantsArray = [];
  for (let i = 0; i < applicants.length; i++) {
    let { _id, firstName, lastName } = await userModel.findOne({
      _id: applicants[i],
    });
    applicantsArray.push({
      _id,
      scolarshipId: scolarship._id,
      applicantName: firstName + " " + lastName,
      scolarshipName,
    });
  }
  res.json({ message: "success", applicantsArray });
};

module.exports.deleteScholarship = async (req, res) => {
  const { _id } = req.params;
  await scolarshipModel.deleteOne({ _id });
  res.json({ message: "success" });
};
module.exports.deleteApplicationScolarship = async (req, res) => {
  const { applicantId, scholarshipId } = req.body;
  await scolarshipModel.updateOne(
    { _id: scholarshipId },
    { $pull: { applicants: applicantId } }
  );
  res.json({ message: "success" });
};

module.exports.getScholarshipInfo = async (req, res) => {
  const { _id } = req.params;
  const scholarship = await scolarshipModel.find({ _id });
  res.json({ message: "success", scholarship });
};
