const { mongoose } = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventName: String,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    eventType: String,
    eventLocation: String,
    eventDescription: String,
    eventThumbnail: String,
    attendance: {
      type: Array,
      default: [],
    },
    expert: String,
    orginizationId: String,
  },
  {
    timestamps: true,
  }
);

module.exports.eventModel = mongoose.model("events", eventSchema);
