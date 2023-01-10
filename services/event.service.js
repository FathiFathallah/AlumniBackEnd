const { eventModel } = require("../models/event.model");
const { orginizationModel } = require("../models/orginization.model");
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
  let [event] = await eventModel.insertMany({
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
  await orginizationModel.findOneAndUpdate(
    { _id: orginizationId },
    { $addToSet: { events: event._id + "" } }
  );
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

//UPDATE
module.exports.updateEventTime = async (req, res) => {
  const { _id, startDate, endDate, startTime, endTime } = req.body;
  await eventModel.findOneAndUpdate(
    { _id },
    { startDate, endDate, startTime, endTime }
  );
  res.json({ message: `success` });
};

module.exports.updateEventInfo = async (req, res) => {
  const { _id, eventName, eventType, eventLocation, eventDescription } =
    req.body;
  await eventModel.findOneAndUpdate(
    { _id },
    {
      eventName,
      eventType,
      eventLocation,
      eventDescription,
      eventThumbnail: req.file.filename,
    }
  );
  res.json({ message: `success` });
};

module.exports.deleteChannelEvent = async (req, res) => {
  const { _id } = req.body;
  let [event] = await eventModel.find({ _id });
  await orginizationModel.updateOne(
    { _id: event.orginizationId },
    { $pull: { events: _id } }
  );
  await eventModel.deleteOne({ _id });
  res.json({ message: `success` });
};

//USER2
module.exports.getUpcomingEvents = async (req, res) => {
  let currentDate = new Date();
  currentDate = currentDate.toISOString();
  let events = await eventModel.find({
    startDate: { $gt: currentDate },
  });
  res.json({ message: `success`, events });
};

module.exports.getEventThumbnail = async (req, res) => {
  const { _id } = req.params;
  let event = await eventModel.findOne({ _id });
  const { eventThumbnail } = event;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//eventThumbnail//" +
      eventThumbnail
  );
};

module.exports.bookEvent = async (req, res) => {
  const { _id, userId } = req.body;
  await eventModel.findOneAndUpdate(
    { _id },
    { $addToSet: { attendance: userId } }
  );
  res.json({ message: `success` });
};
