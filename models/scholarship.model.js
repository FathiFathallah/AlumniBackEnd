const { mongoose } = require("mongoose");

const scolarshipSchema = mongoose.Schema(
  {
    universityId: {
      type: String,
      required: true,
    },
    scolarshipName: String,
    postDate: Date,
    deadline: Date,
    scholarshipDescription: String,
    scholarshipOverview: String,
    scholarshipMissions: Array,
    applicants: Array,
  },
  {
    timestamps: true,
  }
);

module.exports.scolarshipModel = mongoose.model(
  "scolarships",
  scolarshipSchema
);
