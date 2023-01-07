const {
  uploadeventThumbnailMiddleware,
} = require("../middlewware/upload/event.upload");
const { addNewEvent } = require("../services/event.service");

const router = require("express").Router();

router.put(
  "/api/event/addNewEvent",
  uploadeventThumbnailMiddleware,
  addNewEvent
);

module.exports = router;
