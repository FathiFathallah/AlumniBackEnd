const { mongoose } = require("mongoose");

const universitySchema = mongoose.Schema(
  {
    universityName: String,
    description: String,
    expertName: String,
    category: Array,
    expertPhoneNumber: String,
    events: {
      type: Array,
      default: [],
    },
    scholarships: {
      type: Array,
      default: [],
    },
    country: String,
    city: String,
    coverImg: String,
    expertImg: String,
    expertEmailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports.universityModel = mongoose.model(
  "universities",
  universitySchema
);
