const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    birthDate: {
      type: Date,
      min: "1980-09-28",
      max: "2005-1-1",
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    country: String,
    city: {
      type: String,
      default: "",
    },
    phoneNumber: String,
    studyField: String,
    studyState: String,
    userName: String,
    specialization: {
      type: String,
      default: "",
    },
    graduationYear: {
      type: Date,
    },
    education: Array,
    skills: Array,
    about: {
      type: String,
      default: "",
    },
    cv: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    experience: Array,
    documents: Array,
    positions: Array,
    followedChannelsMemberships: Array,
    password: String,
    emailConfirm: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.userModel = mongoose.model("users", userSchema);
