const {
  uploadeventThumbnailMiddleware,
} = require("../middlewware/upload/event.upload");
const { schedule } = require("../scheduleEvents/schedule");
const { sendReminder } = require("../scheduleEvents/sendReminder");
const {
  addNewEvent,
  getEvents,
  getChannelEvents,
  updateEventInfo,
  updateEventTime,
  deleteChannelEvent,
  getUpcomingEvents,
  getEventThumbnail,
  bookEvent,
  getEvenEmailReminderThumbnail,
  getUserEvents,
} = require("../services/event.service");

const router = require("express").Router();

router.put(
  "/api/event/addNewEvent",
  uploadeventThumbnailMiddleware,
  addNewEvent,
  schedule,
  sendReminder
);

router.get("/api/event/getEvents/", getEvents);
router.get("/api/event/getChannelEvents/:_id", getChannelEvents);

//UPDATE
router.put(
  "/api/event/updateEventInfo",
  uploadeventThumbnailMiddleware,
  updateEventInfo
);

router.put("/api/event/updateEventTime", updateEventTime);
router.delete("/api/event/deleteChannelEvent", deleteChannelEvent);

router.get("/api/event/getUpcomingEvents", getUpcomingEvents);
router.get("/api/event/getEventThumbnail/:_id", getEventThumbnail);

//////BOOKING FOR EVENT
router.put("/api/eventUser/userBookingEvent", bookEvent);
router.get("/api/getEvenEmailReminderThumbnail", getEvenEmailReminderThumbnail);

router.get("/api/event/getUserEvents/:_id", getUserEvents);

module.exports = router;
