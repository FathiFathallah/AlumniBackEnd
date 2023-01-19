const { mongoose } = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    orginizationId: {
      type: String,
      required: true,
    },
    jobName: String,
    jobLevel: String,
    industry: String,
    salary: Number,
    experience: String,
    jobType: String,
    postDate: Date,
    deadline: Date,
    jobOverview: String,
    applicants: Array,
    requiredSkills: Array,
    preferredExperience: Array,
  },
  {
    timestamps: true,
  }
);

module.exports.jobModel = mongoose.model("jobs", jobSchema);
