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

module.exports.jobFiltering = async (req, res) => {
  const { industry, jobType, country } = req.body;
  let currentDate = new Date();
  currentDate = currentDate.toISOString();
  let jobsSearched = [];
  let jobsId = [];

  let jobs = await jobModel.find({
    industry,
    deadline: { $gt: currentDate },
  });
  for (let i = 0; i < jobs.length; i++) {
    jobsSearched.push(jobs[i]);
    jobsId.push(jobs[i]._id + "");
  }

  let jobs2 = await jobModel.find({
    jobType,
    deadline: { $gt: currentDate },
  });

  for (let j = 0; j < jobs2.length; j++) {
    if (!jobsId.includes(jobs2[j]._id + "")) {
      jobsId.push(jobs2[j]._id + "");
      jobsSearched.push(jobs2[j]);
    }
  }

  let org = await orginizationModel.find({
    country,
  });

  let jobsOrg = [];
  for (let i = 0; i < org.length; i++) {
    for (let j = 0; j < org[i].jobs.length; j++) {
      jobsOrg.push(org[i].jobs[j]);
    }
  }
  let jobs3 = await jobModel.find({
    _id: { $in: jobsOrg },
    deadline: { $gt: currentDate },
  });

  for (let j = 0; j < jobs3.length; j++) {
    if (!jobsId.includes(jobs3[j]._id + "")) {
      jobsSearched.push(jobs3[j]);
    }
  }
  res.json({ message: "success", jobsSearched });
};
