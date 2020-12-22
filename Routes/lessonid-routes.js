const express = require("express");
const Lessons = require("../models/dbHelpers");
const LessonsIdMessages = require("./lessons-id-messages-routes");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  Lessons.findById(req.params.id)
    .then(lesson => {
      if (lesson) res.status(200).json(lesson);
      else res.status(404).json({ message: "Lesson not found" });
    })
    .catch(lesson => {
      res.status(500).json({ message: "Unable to retrieve specified lesson" });
    });
});

router.delete("/", (req, res) => {
  const { id } = req.params;

  Lessons.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        res.status(404).json({ message: "Unable to locate record" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to delete" });
    });
});

router.patch("/", (req, res) => {
  const { id } = req.params;

  Lessons.update(id, req.body)
    .then(lesson => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to update record" });
    });
});

router.use("/messages", LessonsIdMessages);

module.exports = router;
