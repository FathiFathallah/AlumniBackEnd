const { mongoose } = require("mongoose");

const associationSchema = mongoose.Schema(
  {
    associationName: String,
    description: String,
    expertName: String,
    category: Array,
    expertPhoneNumber: String,
    members: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    events: {
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

module.exports.associationModel = mongoose.model(
  "associations",
  associationSchema
);
