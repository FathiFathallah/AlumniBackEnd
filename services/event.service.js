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

module.exports.getEvents = async (req, res) => {
  let events = await eventModel.find({});
  res.json({ message: `success`, events });
};

module.exports.getChannelEvents = async (req, res) => {
  const { _id } = req.params;
  let events = await eventModel.find({ orginizationId: _id });
  res.json({ message: `success`, events });
};