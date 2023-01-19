const { jobModel } = require("../models/job.model");
const { orginizationModel } = require("../models/orginization.model");
const { userModel } = require("../models/user.model");

module.exports.addJob = async (req, res) => {
  const {
    orginizationId,
    jobName,
    jobLevel,
    industry,
    salary,
    experience,
    jobType,
    postDate,
    deadline,
    jobOverview,
    requiredSkills,
    preferredExperience,
  } = req.body;
  const [job] = await jobModel.insertMany({
    orginizationId,
    jobName,
    jobLevel,
    industry,
    salary,
    experience,
    jobType,
    postDate,
    deadline,
    jobOverview,
    requiredSkills,
    preferredExperience,
  });
  await orginizationModel.findOneAndUpdate(
    { _id: orginizationId },
    { $addToSet: { jobs: job._id } }
  );
  res.json({ message: "success" });
};

module.exports.getJobs = async (req, res) => {
  const { _id } = req.params;
  const jobs = await jobModel.find({ orginizationId: _id });
  res.json({ message: "success", jobs });
};

module.exports.getJob = async (req, res) => {
  const { _id } = req.params;
  const job = await jobModel.find({ _id });
  res.json({ message: "success", job });
};

module.exports.updateJob = async (req, res) => {
  const {
    _id,
    jobName,
    jobLevel,
    industry,
    salary,
    experience,
    jobType,
    postDate,
    deadline,
    jobOverview,
    requiredSkills,
    preferredExperience,
  } = req.body;
  await jobModel.findOneAndUpdate(
    { _id },
    {
      jobName,
      jobLevel,
      industry,
      salary,
      experience,
      jobType,
      postDate,
      deadline,
      jobOverview,
      requiredSkills,
      preferredExperience,
    }
  );
  res.json({ message: "success" });
};

module.exports.deleteJob = async (req, res) => {
  const { _id } = req.params;
  await jobModel.deleteOne({ _id });
  res.json({ message: "success" });
};

module.exports.getJobApplicants = async (req, res) => {
  const { _id } = req.params;
  const job = await jobModel.findOne({ _id });
  const { applicants, jobName } = job;
  let applicantsArray = [];
  for (let i = 0; i < applicants.length; i++) {
    let { _id, firstName, lastName } = await userModel.findOne({
      _id: applicants[i],
    });
    applicantsArray.push({
      _id,
      jobId: job._id,
      applicantName: firstName + " " + lastName,
      jobName,
    });
  }
  res.json({ message: "success", applicantsArray });
};

module.exports.deleteApplication = async (req, res) => {
  const { applicantId, jobId } = req.body;
  await jobModel.updateOne(
    { _id: jobId },
    { $pull: { applicants: applicantId } }
  );
  res.json({ message: "success" });
};

module.exports.getUserApplication = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  //return personal information about the user

  res.json({ message: "success" });
};

////////////////////////////
module.exports.applyToJob = async (req, res) => {
  const { _id, jobId } = req.body;
  let user = await userModel.findOne({ _id });
  if (user.cv === "") {
    res.json({ message: "user cv needed" });
  } else {
    await jobModel.findOneAndUpdate(
      { _id: jobId },
      { $addToSet: { applicants: _id } }
    );
    res.json({ message: "success" });
  }
};

module.exports.getUserJobs = async (req, res) => {
  let currentDate = new Date();
  currentDate = currentDate.toISOString();
  let jobs = await jobModel.find({
    deadline: { $gt: currentDate },
  });
  res.json({ message: "success", jobs });
};
