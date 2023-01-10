const {
  uploadeventThumbnailMiddleware,
} = require("../middlewware/upload/event.upload");
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
} = require("../services/event.service");

const router = require("express").Router();

router.put(
  "/api/event/addNewEvent",
  uploadeventThumbnailMiddleware,
  addNewEvent
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

module.exports = router;
