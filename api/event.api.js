const {
  uploadeventThumbnailMiddleware,
} = require("../middlewware/upload/event.upload");
const { addNewEvent, getEvents } = require("../services/event.service");

const router = require("express").Router();

router.put(
  "/api/event/addNewEvent",
  uploadeventThumbnailMiddleware,
  addNewEvent
);

router.get("/api/event/getEvents/", getEvents);

module.exports = router;
