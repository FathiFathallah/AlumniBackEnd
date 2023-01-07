const { eventModel } = require("../models/event.model");

module.exports.addNewEvent = async (req, res) => {
  const {
    orginizationId,
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
    eventType,
    eventLocation,
    eventDescription,
  } = req.body;
  await eventModel.insertMany({
    orginizationId,
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
    eventType,
    eventLocation,
    eventDescription,
    eventThumbnail: req.file.filename,
  });
  res.json({ message: `success` });
};
