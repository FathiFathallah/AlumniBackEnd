const { mongoose } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    orginizationId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["orginization", "association"],
    },
    expertName: {
      type: String,
      max: 100,
    },
    description: {
      type: String,
      max: 500,
    },
    mediaFile: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports.postModel = mongoose.model("posts", postSchema);
