const schedule = require("node-schedule");
const { eventModel } = require("../models/event.model");
const { userModel } = require("../models/user.model");

const { orginizationModel } = require("../models/orginization.model");
const { htmlreturn } = require("./EmailContent");
const { sendEmail } = require("./sendEmail");

module.exports.sendReminder = (req, res) => {
  const { eventId, orgId, reminderDate, reminderDate2 } = req.body;

  schedule.scheduleJob(reminderDate, async () => {
    let event = await eventModel.findOne({ _id: eventId });

    let org = await orginizationModel.findOne({ _id: orgId });
    const {
      eventName,
      eventType,
      eventDescription,
      eventLocation,
      attendance,
    } = event;
    const eventDate = event.startDate;
    const { expertName, channelName, orginizationName, country, city } = org;

    for (let i = 0; i < attendance.length; i++) {
      const { firstName, emailAddress } = await userModel.findOne({
        _id: attendance[i],
      });
      let options = {};
      let htmlEmail = htmlreturn(
        eventName,
        eventType,
        firstName,
        expertName,
        channelName,
        orginizationName,
        eventDescription,
        eventLocation,
        eventDate,
        country,
        city
      );
      options.htmlEmail = htmlEmail;
      options.emailAddress = emailAddress;
      options.eventType = eventType;
      options.eventName = eventName;
      sendEmail(options);
    }
  });

  schedule.scheduleJob(reminderDate2, async () => {
    let event = await eventModel.findOne({ _id: eventId });

    let org = await orginizationModel.findOne({ _id: orgId });
    const {
      eventName,
      eventType,
      eventDescription,
      eventLocation,
      attendance,
    } = event;
    const eventDate = event.startDate;
    const { expertName, channelName, orginizationName, country, city } = org;

    for (let i = 0; i < attendance.length; i++) {
      const { firstName, emailAddress } = await userModel.findOne({
        _id: attendance[i],
      });
      let options = {};
      let htmlEmail = htmlreturn(
        eventName,
        eventType,
        firstName,
        expertName,
        channelName,
        orginizationName,
        eventDescription,
        eventLocation,
        eventDate,
        country,
        city
      );
      options.htmlEmail = htmlEmail;
      options.emailAddress = emailAddress;
      options.eventType = eventType;
      options.eventName = eventName;
      sendEmail(options);
    }
  });
  res.json({ message: `success` });
};
