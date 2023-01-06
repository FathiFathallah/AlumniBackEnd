const { mongoose } = require("mongoose");

const scolarshipSchema = mongoose.Schema(
  {
    universityId: {
      type: String,
      required: true,
    },
    scolarshipName: String,
    postDate: String,
    deadline: String,
    scholarshipDescription: String,
    scholarshipOverview: String,
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
