const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.get("/:id", (req, res) => {
  Lessons.findMessageById(req.params.id)
    .then(message => {
      if (message) res.status(200).json(message);
      else res.status(404).json({ message: "message not found" });
    })
    .catch(message => {
      res.status(500).json({ message: "Unable to retrieve specified message" });
    });
});

router.get("/", (req, res) => {
  Lessons.findMessage()
    .then(message => {
      res.status(200).json(message);
    })
    .catch(message => {
      res.status(500).json({ message: "Unable to retrieve messages" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.removeMessages(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        res.status(404).json({ message: "Unable to locate record" });
      }
    })
    .catch(error => {
      res.status(500).json({ Error: "Count delete message" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.updateMessages(id, req.body)
    .then(message => {
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to update record" });
    });
});

module.exports = router;
